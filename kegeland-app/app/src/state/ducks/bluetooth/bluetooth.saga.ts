import {AnyAction, PayloadAction} from '@reduxjs/toolkit';
import {
  put,
  take,
  fork,
  cancel,
  all,
  cancelled,
  takeEvery,
  call,
} from 'redux-saga/effects';

import {store} from '~state/store';
import {addServiceListener, getProfile} from '~utils/bluetooth';

import {createDeviceStreamChannel} from './bluetooth.channels';
import {connectDevice, startDeviceScan} from './bluetooth.actions';
import {bluetoothSlice} from './bluetooth.reducer';
import {BluetoothDevice} from './bluetooth.interface';

export const sagaActionConstants = {
  SET_ERROR: bluetoothSlice.actions.setError.type,
  ON_DEVICE_CONNECTED: connectDevice.fulfilled.type,
  ON_DEVICE_DISCONNECTED: bluetoothSlice.actions.deviceDisconnected.type,
  SCAN_FOR_DEVICE_START: startDeviceScan.fulfilled.type,
  SCAN_FOR_DEVICE_STOP: bluetoothSlice.actions.stopDeviceScan.type,
  ADD_HOUSEKEEPING_SERVICE: bluetoothSlice.actions.addHousekeepingService.type,
  ADD_AVAILABLE_DEVICE: bluetoothSlice.actions.addAvailableDevice.type,
};

/**
 * Observer function for setting up newly connected devices
 */
function* handleOnDeviceConnected(
  action: PayloadAction<void, string, {arg: string}>,
): Generator<AnyAction, void, void> {
  try {
    const devices = store.getState().bluetooth.connectedDevices;
    const device = devices[action.meta.arg];
    // Retrieve the profile of the device
    const profile = getProfile(device.type);
    // Initialize listeners for battery updates
    yield call(addServiceListener, device.id, profile.batteryService.service);
    yield put({
      type: sagaActionConstants.ADD_HOUSEKEEPING_SERVICE,
      payload: {
        uuid: profile.batteryService.service.uuid,
        peripheral: device.id,
      },
    });
  } catch (err) {
    let msg = 'An unknown error has occurred';
    if (err instanceof Error) {
      msg = err.message;
    }
    yield put({
      type: sagaActionConstants.SET_ERROR,
      payload: msg,
    });
  }
}

/**
 * Observer function for adding discovered devices
 * to the state
 */
export function* handleDeviceScan(): Generator<
  AnyAction,
  void,
  BluetoothDevice
> {
  const channel = createDeviceStreamChannel();
  try {
    while (true) {
      // Receive discovered devices
      const peripheral = yield take(channel);
      // Dispatch discovered device to the reducer
      yield put({
        type: sagaActionConstants.ADD_AVAILABLE_DEVICE,
        payload: peripheral,
      });
    }
  } catch (err) {
    let msg = 'An unknown error has occurred';
    if (err instanceof Error) {
      msg = err.message;
    }
    yield put({
      type: sagaActionConstants.SET_ERROR,
      payload: msg,
    });
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export function* watchDeviceScanRequest(): any {
  while (yield take(sagaActionConstants.SCAN_FOR_DEVICE_START)) {
    const task = yield fork(handleDeviceScan);
    yield take(sagaActionConstants.SCAN_FOR_DEVICE_STOP);
    yield cancel(task);
  }
}

function* watchOnDeviceConnectedRequest(): Generator {
  yield takeEvery(
    sagaActionConstants.ON_DEVICE_CONNECTED,
    handleOnDeviceConnected,
  );
}

export function* bluetoothSaga(): any {
  yield all([
    fork(watchDeviceScanRequest),
    fork(watchOnDeviceConnectedRequest),
  ]);
}

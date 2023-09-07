import {expectSaga} from 'redux-saga-test-plan';

import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';
import {store} from '~state/store';
import * as utils from '~utils/bluetooth';

import {BluetoothState} from '../bluetooth.interface';
import bluetoothReducer, {initialState} from '../bluetooth.reducer';
import {bluetoothSaga, sagaActionConstants} from '../bluetooth.saga';

describe('Test bluetooth-saga', () => {
  it('handleOnDeviceConnected should add housekeeping service for connected devices', () => {
    const state: BluetoothState = {
      ...initialState,
      connectedDevices: {[deviceMock.id]: deviceMock},
    };
    const storeState = store.getState();
    jest.spyOn(store, 'getState').mockImplementation(() => ({
      ...storeState,
      bluetooth: state,
    }));
    jest
      .spyOn(utils, 'addServiceListener')
      .mockImplementation(() => Promise.resolve());

    const profile = utils.getProfile(deviceMock.type);
    const action = {
      type: sagaActionConstants.ON_DEVICE_CONNECTED,
      meta: {arg: deviceMock.id},
    };
    return expectSaga(bluetoothSaga)
      .withReducer(bluetoothReducer)
      .put({
        type: sagaActionConstants.ADD_HOUSEKEEPING_SERVICE,
        payload: {
          uuid: profile.batteryService.service.uuid,
          peripheral: deviceMock.id,
        },
      })
      .dispatch(action)
      .silentRun();
  });

  it('handleOnDeviceConnected should set error if a connected device fails', () => {
    const state: BluetoothState = {
      ...initialState,
      connectedDevices: {[deviceMock.id]: deviceMock},
    };
    const storeState = store.getState();
    jest.spyOn(store, 'getState').mockImplementation(() => ({
      ...storeState,
      bluetooth: state,
    }));
    const error = new Error('Error');
    jest
      .spyOn(utils, 'addServiceListener')
      .mockImplementation(() => Promise.reject(error));

    const action = {
      type: sagaActionConstants.ON_DEVICE_CONNECTED,
      meta: {arg: deviceMock.id},
    };
    return expectSaga(bluetoothSaga)
      .withReducer(bluetoothReducer)
      .put({
        type: sagaActionConstants.SET_ERROR,
        payload: error.message,
      })
      .dispatch(action)
      .silentRun();
  });
});

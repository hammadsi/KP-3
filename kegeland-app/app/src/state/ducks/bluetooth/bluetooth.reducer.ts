import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {readPeripheralDeviceBattery} from '~utils/bluetooth';
import {isPendingAction, isRejectedAction} from '~utils/thunkUtils';

import {
  connectDevice,
  disconnectDevice,
  startDeviceScan,
} from './bluetooth.actions';
import {
  addAvailableDeviceReducer,
  connectDeviceReducer,
  disconnectDeviceReducer,
} from './bluetooth.helpers';
import {BluetoothState} from './bluetooth.interface';

/**
 * The initial bluetooth state
 */
export const initialState: BluetoothState = {
  isReady: false,
  isScanning: false,
  connectedDevices: {},
  availableDevices: {},
  housekeepers: {},
  error: undefined,
};

/**
 * The reducer for bluetooth state
 */
export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    setReady: (state) => {
      state.isReady = true;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    stopDeviceScan: (state) => {
      state.isScanning = false;
    },
    updateBattery: (
      state,
      action: PayloadAction<{peripheral: string; value: number[]}>,
    ) => {
      const {peripheral, value} = action.payload;
      const device = state.connectedDevices[peripheral];
      const val = readPeripheralDeviceBattery(device.type, value);
      state.connectedDevices[peripheral].battery = val;
    },
    addHousekeepingService: (
      state,
      action: PayloadAction<{uuid: string; peripheral: string}>,
    ) => {
      const {uuid, peripheral} = action.payload;
      state.housekeepers = {...state.housekeepers, [uuid]: peripheral};
    },
    deviceDisconnected: disconnectDeviceReducer,
    addAvailableDevice: addAvailableDeviceReducer,
    clearAvailableDevices: (state) => {
      state.availableDevices = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startDeviceScan.rejected, (state) => {
        state.isScanning = false;
      })
      .addCase(startDeviceScan.fulfilled, (state) => {
        state.isScanning = true;
      })
      .addCase(connectDevice.pending, (state, action) => {
        const deviceId = action.meta.arg;
        if (deviceId in state.availableDevices) {
          state.availableDevices[deviceId].state = 'connecting';
        }
        if (deviceId in state.connectedDevices) {
          state.connectedDevices[deviceId].state = 'connecting';
        }
      })
      .addCase(connectDevice.rejected, (state, action) => {
        const deviceId = action.meta.arg;
        if (deviceId in state.availableDevices) {
          state.availableDevices[deviceId].state = 'available';
        }
        if (deviceId in state.connectedDevices) {
          delete state.connectedDevices[deviceId];
        }
      })
      .addCase(connectDevice.fulfilled, connectDeviceReducer)
      .addCase(disconnectDevice.pending, (state, action) => {
        const deviceId = action.meta.arg;
        if (deviceId in state.connectedDevices) {
          state.connectedDevices[action.meta.arg].state = 'disconnecting';
        }
      })
      .addMatcher(
        (action) => isPendingAction(action, 'bluetooth'),
        (state) => {
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isRejectedAction(action, 'bluetooth'),
        (state, {error}) => {
          state.error = error.message;
        },
      );
  },
});

export const {
  setReady,
  setError,
  updateBattery,
  addHousekeepingService,
  stopDeviceScan,
  deviceDisconnected,
  addAvailableDevice,
  clearAvailableDevices,
} = bluetoothSlice.actions;

export default bluetoothSlice.reducer;

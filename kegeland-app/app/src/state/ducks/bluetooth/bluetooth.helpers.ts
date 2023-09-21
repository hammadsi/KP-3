import {PayloadAction} from '@reduxjs/toolkit';
import {findKey} from 'lodash';

import {BluetoothDevice, BluetoothState} from './bluetooth.interface';
import {orderDevicesByState} from './bluetooth.utils';

/**
 * Adds an available device to the state
 * @param state the current state
 * @param action the action returned
 */
export const addAvailableDeviceReducer = (
  state: BluetoothState,
  action: PayloadAction<BluetoothDevice>,
) => {
  const deviceId = action.payload.id;
  // Check if the device already is in the state
  if (
    !(deviceId in state.connectedDevices || deviceId in state.availableDevices)
  ) {
    state.availableDevices[deviceId] = action.payload;
  }
};

/**
 * Adds a connected device to the state
 * @param state the current state
 * @param action the action returned
 */
export const connectDeviceReducer = (
  state: BluetoothState,
  action: PayloadAction<void, string, {arg: string}>,
) => {
  const deviceId = action.meta.arg;
  // Check if device is in list of available devices
  if (deviceId in state.availableDevices) {
    // Update device state to connected
    state.availableDevices[deviceId].state = 'connected';
    const device = state.availableDevices[deviceId];
    device.battery = 1;
    // Add device to list of connected devices
    state.connectedDevices[deviceId] = device;
    // Sort the list of available devices by state, 'connected' first
    state.availableDevices = orderDevicesByState(state.availableDevices);
  }
  // Check if device is in list of connected devices
  if (deviceId in state.connectedDevices) {
    // Update device state to connected
    state.connectedDevices[deviceId].state = 'connected';
  }
};

/**
 * Removes a disconnected device to the state
 * @param state the current state
 * @param action the action returned
 */
export const disconnectDeviceReducer = (
  state: BluetoothState,
  action: PayloadAction<string>,
) => {
  const deviceId = action.payload;
  // Check if device is in list of available devices
  if (deviceId in state.availableDevices) {
    delete state.availableDevices[deviceId].battery;
    // Update device state to available
    state.availableDevices[deviceId].state = 'available';
    // Sort the list of available devices by state, 'connected' first
    state.availableDevices = orderDevicesByState(state.availableDevices);
  }
  // Remove device from housekeepers, which are responsible for updating battery state
  const housekeepingUUID = findKey(
    state.housekeepers,
    (val) => val === deviceId,
  );
  if (housekeepingUUID) {
    delete state.housekeepers[housekeepingUUID];
  }
  // Delete device from list of connected devices
  delete state.connectedDevices[deviceId];
};

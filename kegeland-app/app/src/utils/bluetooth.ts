import {chain, keys} from 'lodash';
import {startNotification, stopNotification} from 'react-native-ble-manager';

import {BLE_PROFILES, PERIPHERAL_MAP, DeviceType} from '~constants/bluetooth';
import {BluetoothService} from '~constants/bluetooth/interface';

/**
 * Retrieves a bluetooth profile for the specified device
 * @param key the device to retrieve
 * @returns the bluetooth profile for specified device
 */
export const getProfile = (key: DeviceType) => {
  return BLE_PROFILES[key];
};

/**
 * Reads the device battery using a custom function specified in the device's bluetooth profile.
 * @param key the device to use
 * @param bytes the bytes to read
 * @returns the battery state
 */
export const readPeripheralDeviceBattery = (key: DeviceType, bytes: number[]) =>
  getProfile(key).batteryService.fn(bytes);

/**
 * Retrieves all service ids supported
 * @returns all supported service ids
 */
export const getAllServiceIds = () => {
  return keys(PERIPHERAL_MAP);
};

/**
 * Retrieves the device screen for a selected device
 * @param key the device
 * @returns the specific screen for the specified device
 */
export const getDeviceScreen = (key: DeviceType) => getProfile(key).navScreen;

/**
 * Will retrieve a device type based on a list of service uuids
 * @param serviceUUIDs the service uuids to check
 * @returns the device type
 */
export const getPeripheralType = (serviceUUIDs: string[]) => {
  const key = chain(serviceUUIDs)
    .filter((uuid) => uuid in PERIPHERAL_MAP)
    .first()
    .value();
  return key ? PERIPHERAL_MAP[key] : undefined;
};

/**
 * Will add notify-listeners for all characteristics within a BLE service
 * @param peripheral the peripheral id
 * @param service the service to listen to
 */
export const addServiceListener = async (
  peripheral: string,
  service: BluetoothService,
) => {
  try {
    for (const char of service.characteristics) {
      await startNotification(peripheral, service.uuid, char);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error has occurred');
  }
};

/**
 * Will remove notify-listeners for all characteristics within a BLE service
 * @param peripheral the peripheral id
 * @param service the service to remove
 */
export const removeServiceListener = async (
  peripheral: string,
  service: BluetoothService,
) => {
  try {
    for (const char of service.characteristics) {
      await stopNotification(peripheral, service.uuid, char);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error has occurred');
  }
};

import BleManager from 'react-native-ble-manager';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {ALLOW_DUPLICATE_DEVICES, SCAN_TIME} from '~constants/bluetooth';
import {getAllServiceIds} from '~utils/bluetooth';
import {sleep} from '~utils/sleep';

/**
 * Initiate scan for bluetooth devices
 * @see {@link BleManager.scan}
 */
export const startDeviceScan = createAsyncThunk(
  'bluetooth/scanForDevices',
  async () =>
    BleManager.scan(
      getAllServiceIds(),
      SCAN_TIME,
      ALLOW_DUPLICATE_DEVICES,
    ).catch(() => {
      throw new Error('Failed to start peripheral scan');
    }),
);

/**
 * Force stop device scan
 * @see {@link BleManager.stopScan}
 */
export const forceStopDeviceScan = createAsyncThunk(
  'bluetooth/forceStopScan',
  async () => {
    BleManager.stopScan();
  },
);

/**
 * Thunk action for connecting a bluetooth device
 * @param id the id of the device
 * @see {@link BleManager.connect}
 */
export const connectDevice = createAsyncThunk(
  'bluetooth/connectDevice',
  async (id: string) => {
    try {
      await BleManager.connect(id);
      await sleep(500).then(() => BleManager.retrieveServices(id));
    } catch {
      throw new Error(`Failed to connect to device '${id}'`);
    }
  },
);

/**
 * Thunk action for disconnecting a bluetooth device
 * @param id the id of the device
 * @see {@link BleManager.disconnect}
 */
export const disconnectDevice = createAsyncThunk(
  'bluetooth/disconnectDevice',
  async (id: string) =>
    BleManager.disconnect(id)
      .catch(() => BleManager.disconnect(id, true))
      .catch(() => {
        throw new Error(`Failed to disconnect device '${id}'`);
      }),
);

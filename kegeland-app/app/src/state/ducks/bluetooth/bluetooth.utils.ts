import {chain} from 'lodash';

import {BluetoothDevice} from './bluetooth.interface';

export const orderDevicesByState = (devices: Record<string, BluetoothDevice>) =>
  chain(devices).map().orderBy(['state'], ['desc']).keyBy('id').value();

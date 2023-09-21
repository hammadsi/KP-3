import {Peripheral} from 'react-native-ble-manager';

import {BluetoothDevice} from '../bluetooth/bluetooth.interface';

export const deviceMock: BluetoothDevice = {
  id: '23:32:FA:32',
  name: 'Test device',
  state: 'available',
  type: 'femfit',
  battery: 1,
};

export const peripheralMock: Peripheral = {
  id: deviceMock.id,
  advertising: {},
  rssi: -123,
  name: deviceMock.name,
};

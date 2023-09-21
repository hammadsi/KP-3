import {DeviceStackParamList} from '~routes/interface';

export type BluetoothCharacteristic = string;
export type BluetoothService = {
  uuid: string;
  characteristics: BluetoothCharacteristic[];
};

export type BluetoothProfile = {
  navScreen: keyof DeviceStackParamList;
  services: string[];
  batteryService: {
    service: BluetoothService;
    fn: (bytes: number[]) => number;
  };
};

export type PeripheralNotification = {
  value: number[];
  peripheral: string;
  characteristic: string;
  service: string;
};

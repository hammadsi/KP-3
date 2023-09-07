import {DeviceType} from '~constants/bluetooth';

export type DeviceConnectionState =
  | 'available'
  | 'connecting'
  | 'disconnecting'
  | 'connected';

export type CharacteristicValue = any[];

export type DeviceCharacteristics = Record<string, CharacteristicValue>;

export type BatchedDeviceCharacteristics = Record<
  string,
  DeviceCharacteristics
>;

export type BluetoothDevice = {
  id: string;
  name: string;
  type: DeviceType;
  battery?: number;
  state: DeviceConnectionState;
};

export interface BluetoothState {
  isReady: boolean;
  isScanning: boolean;
  connectedDevices: Record<string, BluetoothDevice>;
  availableDevices: Record<string, BluetoothDevice>;
  housekeepers: Record<string, string>;
  error: string | undefined;
}

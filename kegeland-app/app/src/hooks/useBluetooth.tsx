import {useEffect} from 'react';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {forEach} from 'lodash';

import {
  deviceDisconnected,
  setError,
  setReady,
  stopDeviceScan,
  updateBattery,
} from '~state/ducks/bluetooth/bluetooth.reducer';
import {ANDROID_PERMISSIONS} from '~constants/permissions';
import checkAndroidPermission from '~utils/checkAndroidPermission';
import {connectDevice} from '~state/ducks/bluetooth/bluetooth.actions';
import {PeripheralNotification} from '~constants/bluetooth/interface';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const BleManagerModule = NativeModules.BleManager;
export const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

/**
 * Custom hook for initiating communication with bluetooth devices
 * @returns true
 */
const useBluetooth = () => {
  const dispatch = useAppDispatch();
  const {connectedDevices, housekeepers} = useAppSelector(
    (state) => state.bluetooth,
  );
  /**
   * Updates state in redux store when scan stopped
   */
  const handleStopScan = () => {
    dispatch(stopDeviceScan());
  };

  /**
   * Reconnects devices stored as 'connected' within the redux state
   */
  const reconnectDevices = () => {
    forEach(connectedDevices, (_, peripheral) => {
      dispatch(connectDevice(peripheral));
    });
  };

  /**
   * Handles battery updates for a device
   * @param param0 the peripheral update information
   * @see {@link PeripheralNotification}
   */
  const handlePeripheralUpdate = ({
    peripheral,
    service,
    value,
  }: PeripheralNotification) => {
    if (service in housekeepers) {
      dispatch(updateBattery({peripheral, value}));
    }
  };

  /**
   * Handles disconnected peripherals
   * @param param0 the peripheral id
   */
  const handleDisconnectedPeripheral = ({peripheral}: {peripheral: string}) => {
    dispatch(deviceDisconnected(peripheral));
  };

  /**
   * Verifies necessary permissions
   */
  const verifyPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      for (const permission of ANDROID_PERMISSIONS) {
        await checkAndroidPermission(permission);
      }
    }
  };

  useEffect(() => {
    bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      (data: PeripheralNotification) => handlePeripheralUpdate(data),
    );

    return () => {
      bleManagerEmitter.removeAllListeners(
        'BleManagerDidUpdateValueForCharacteristic',
      );
    };
  }, [housekeepers]);

  useEffect(() => {
    BleManager.start({showAlert: false}).catch((err) => {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError(err));
      }
    });

    bleManagerEmitter.addListener('BleManagerStopScan', () => handleStopScan());
    bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      (data: {peripheral: string}) => handleDisconnectedPeripheral(data),
    );

    // Verify the app's permissions
    verifyPermissions().then(() => dispatch(setReady()));

    // Reconnect devices from state
    reconnectDevices();

    // Remove listeners when the component is unmounted
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
      bleManagerEmitter.removeAllListeners('BleManagerDisconnectPeripheral');
      bleManagerEmitter.removeAllListeners(
        'BleManagerDidUpdateValueForCharacteristic',
      );
    };
  }, []);

  return true;
};

export default useBluetooth;

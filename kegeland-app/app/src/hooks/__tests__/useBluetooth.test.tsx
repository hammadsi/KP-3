import {
  renderHook,
  waitFor as jestWaitFor,
} from '@testing-library/react-native';
import {cloneDeep, map, set} from 'lodash';
import React from 'react';
import BleManager from 'react-native-ble-manager';
import {Provider} from 'react-redux';

import * as bluetoothUtils from '~utils/bluetooth';
import * as femfitConstants from '~lib/femfit/bluetooth/constants';
import * as permissionHandler from '~utils/checkAndroidPermission';
import {connectDevice} from '~state/ducks/bluetooth/bluetooth.actions';
import {BluetoothState} from '~state/ducks/bluetooth/bluetooth.interface';
import {
  deviceDisconnected,
  initialState,
  setError,
  setReady,
  stopDeviceScan,
  updateBattery,
} from '~state/ducks/bluetooth/bluetooth.reducer';
import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';
import {
  initialStore,
  MockStore,
  mockStore,
} from '~state/ducks/__mocks__/store.mock';
import {PeripheralNotification} from '~constants/bluetooth/interface';

import useBluetooth, {bleManagerEmitter} from '../useBluetooth';

jest.useFakeTimers();
describe('Test useBluetooth-hook', () => {
  const startSpy = jest.spyOn(BleManager, 'start');
  const housekeepingService = femfitConstants.HOUSEKEEPING_SERVICE;
  const addListenerSpy = jest.spyOn(bleManagerEmitter, 'addListener');
  const bluetoothState: BluetoothState = {
    ...initialState,
    connectedDevices: {[deviceMock.id]: deviceMock},
    housekeepers: {[housekeepingService.uuid]: deviceMock.id},
  };

  let store: MockStore;

  beforeAll(() => {
    jest
      .spyOn(bluetoothUtils, 'readPeripheralDeviceBattery')
      .mockImplementation(() => 1);
    jest
      .spyOn(BleManager, 'connect')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(BleManager, 'retrieveServices')
      .mockImplementation(() => Promise.resolve() as any);
  });

  beforeEach(() => {
    store = mockStore(
      set(cloneDeep(initialStore), 'bluetooth', bluetoothState),
    );
  });

  describe('Mounted without errors', () => {
    beforeAll(() => {
      startSpy.mockImplementation(() => Promise.resolve());
    });
    it('should initialize correctly on mount', () => {
      renderHook(() => useBluetooth(), {
        wrapper: ({children}: {children: React.ReactNode}) => (
          <Provider store={store}>{children}</Provider>
        ),
      });
      expect(startSpy).toBeCalled();

      const subscribers = [
        'BleManagerStopScan',
        'BleManagerDisconnectPeripheral',
        'BleManagerDidUpdateValueForCharacteristic',
      ];
      expect(addListenerSpy).toBeCalledTimes(subscribers.length);
      expect(map(addListenerSpy.mock.calls, (call) => call[0]).sort()).toEqual(
        subscribers.sort(),
      );
    });

    it('should ask for bluetooth permissions if using Android version >= 23', () => {
      const permissionSpy = jest
        .spyOn(permissionHandler, 'default')
        .mockImplementation(() => Promise.resolve());
      jest.mock('react-native/Libraries/Utilities/Platform', () => ({
        OS: 'android',
        Version: 23,
      }));

      renderHook(() => useBluetooth(), {
        wrapper: ({children}: {children: React.ReactNode}) => (
          <Provider store={store}>{children}</Provider>
        ),
      });

      expect(permissionSpy).toBeCalled();
    });

    it('should dispatch deviceDisconnected on disconnect event', async () => {
      renderHook(() => useBluetooth(), {
        wrapper: ({children}: {children: React.ReactNode}) => (
          <Provider store={store}>{children}</Provider>
        ),
      });
      bleManagerEmitter.emit('BleManagerDisconnectPeripheral', deviceMock.id);
      const expectedAction = deviceDisconnected.type;
      await jestWaitFor(() => {
        expect(map(store.getActions(), 'type')).toContain(expectedAction);
      });
    });

    it('should dispatch stopDeviceScan on stop event', async () => {
      renderHook(() => useBluetooth(), {
        wrapper: ({children}: {children: React.ReactNode}) => (
          <Provider store={store}>{children}</Provider>
        ),
      });
      bleManagerEmitter.emit('BleManagerStopScan');
      const expectedAction = stopDeviceScan.type;
      await jestWaitFor(() => {
        expect(map(store.getActions(), 'type')).toContain(expectedAction);
      });
    });

    it('should dispatch updateBattery on characteristic update event', async () => {
      renderHook(() => useBluetooth(), {
        wrapper: ({children}: {children: React.ReactNode}) => (
          <Provider store={store}>{children}</Provider>
        ),
      });

      const notification: PeripheralNotification = {
        service: housekeepingService.uuid,
        characteristic: housekeepingService.characteristics[0],
        peripheral: deviceMock.id,
        value: [132, 1231, 213, 123, 321, 412, 123, 213],
      };
      bleManagerEmitter.emit(
        'BleManagerDidUpdateValueForCharacteristic',
        notification,
      );
      const expectedAction = updateBattery.type;
      await jestWaitFor(() => {
        expect(map(store.getActions(), 'type')).toContain(expectedAction);
      });
    });

    it('should not dispatch updateBattery on characteristic update event if service does not exist', async () => {
      renderHook(() => useBluetooth(), {
        wrapper: ({children}: {children: React.ReactNode}) => (
          <Provider store={store}>{children}</Provider>
        ),
      });

      const notification: PeripheralNotification = {
        service: '932920d1od01d113d1k0',
        characteristic: housekeepingService.characteristics[0],
        peripheral: deviceMock.id,
        value: [132, 1231, 213, 123, 321, 412, 123, 213],
      };
      bleManagerEmitter.emit(
        'BleManagerDidUpdateValueForCharacteristic',
        notification,
      );
      const expectedAction = updateBattery.type;
      expect(map(store.getActions(), 'type')).not.toContain(expectedAction);
    });
  });

  it('should set error if Bluetooth manager fails with Error-object', async () => {
    startSpy.mockImplementation(() => Promise.reject(new Error('error')));
    renderHook(() => useBluetooth(), {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <Provider store={store}>{children}</Provider>
      ),
    });
    const expectedActions = [
      connectDevice.fulfilled.type,
      setError.type,
      setReady.type,
    ];
    expect(startSpy).toBeCalled();
    await jestWaitFor(() => {
      expect(
        expectedActions.every((val) =>
          map(store.getActions(), 'type').includes(val),
        ),
      ).toBeTruthy();
    });
  });

  it('should set error if Bluetooth manager fails with String-object', async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    startSpy.mockImplementation(() => Promise.reject('Error'));
    renderHook(() => useBluetooth(), {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <Provider store={store}>{children}</Provider>
      ),
    });
    const expectedActions = [
      connectDevice.fulfilled.type,
      setError.type,
      setReady.type,
    ];
    expect(startSpy).toBeCalled();
    await jestWaitFor(() => {
      expect(
        expectedActions.every((val) =>
          map(store.getActions(), 'type').includes(val),
        ),
      ).toBeTruthy();
    });
  });
});

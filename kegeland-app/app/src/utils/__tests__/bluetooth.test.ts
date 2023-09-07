import BleManager from 'react-native-ble-manager';

import {BLE_PROFILES, PERIPHERAL_MAP} from '~constants/bluetooth';
import * as femfitBLE from '~lib/femfit/bluetooth/constants';
import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';
import * as utils from '~utils/bluetooth';

describe('Test bluetooth-utils', () => {
  it('getProfile should return a bluetooth profile', () => {
    expect(utils.getProfile('femfit')).toBe(BLE_PROFILES.femfit);
  });

  it('readPeripheralDeviceBattery should parse bytes for battery status to a number', () => {
    const bytes = [123, 123, 123, 21, 23, 24, 23, 32];
    const res = utils.readPeripheralDeviceBattery('femfit', bytes);
    expect(res).toBe(1);
  });

  it('getAllServiceIds should retrieve all service uuids', () => {
    expect(utils.getAllServiceIds()).toStrictEqual(Object.keys(PERIPHERAL_MAP));
  });

  it('getDeviceScreen should return correct screen route for a device', () => {
    expect(utils.getDeviceScreen('femfit')).toBe(BLE_PROFILES.femfit.navScreen);
  });

  it('getPeripheralType should return correct device based on service uuids', () => {
    const services = Object.values(femfitBLE.SERVICES);
    expect(utils.getPeripheralType(services)).toBe('femfit');
  });
  it('getPeripheralType should return undefined if no service uuids matches', () => {
    const services = ['134wqeiojdcqwdjq'];
    expect(utils.getPeripheralType(services)).toBe(undefined);
  });

  it('addServiceListener should start notifications for all characteristics of given service', async () => {
    const notifySpy = jest
      .spyOn(BleManager, 'startNotification')
      .mockImplementation(() => Promise.resolve());
    const peripheral = deviceMock.id;
    const service = femfitBLE.SENSOR_SERVICE;
    await utils.addServiceListener(peripheral, service);
    expect(notifySpy).toBeCalledTimes(service.characteristics.length);
    notifySpy.mock.calls.forEach((call, idx) => {
      expect(call).toEqual([
        peripheral,
        service.uuid,
        service.characteristics[idx],
      ]);
    });
  });

  it('addServiceListener should throw error on fail', async () => {
    jest
      .spyOn(BleManager, 'startNotification')
      .mockImplementation(() => Promise.reject(new Error('Error')));
    const peripheral = deviceMock.id;
    const service = femfitBLE.SENSOR_SERVICE;
    await expect(
      utils.addServiceListener(peripheral, service),
    ).rejects.toThrowError();
  });

  it('addServiceListener should throw default error on internal error', async () => {
    jest
      .spyOn(BleManager, 'startNotification')
      // eslint-disable-next-line prefer-promise-reject-errors
      .mockImplementation(() => Promise.reject());
    const peripheral = deviceMock.id;
    const service = femfitBLE.SENSOR_SERVICE;
    await expect(
      utils.addServiceListener(peripheral, service),
    ).rejects.toThrowError();
  });

  it('removeServiceListener should stop notifications for all characteristics of given service', async () => {
    const notifySpy = jest
      .spyOn(BleManager, 'stopNotification')
      .mockImplementation(() => Promise.resolve());
    const peripheral = deviceMock.id;
    const service = femfitBLE.SENSOR_SERVICE;
    await utils.removeServiceListener(peripheral, service);
    expect(notifySpy).toBeCalledTimes(service.characteristics.length);
    notifySpy.mock.calls.forEach((call, idx) => {
      expect(call).toEqual([
        peripheral,
        service.uuid,
        service.characteristics[idx],
      ]);
    });
  });

  it('removeServiceListener should throw error on fail', async () => {
    jest
      .spyOn(BleManager, 'stopNotification')
      .mockImplementation(() => Promise.reject(new Error('Error')));
    const peripheral = deviceMock.id;
    const service = femfitBLE.SENSOR_SERVICE;
    await expect(
      utils.removeServiceListener(peripheral, service),
    ).rejects.toThrowError();
  });

  it('removeServiceListener should throw default error on internal error', async () => {
    jest
      .spyOn(BleManager, 'stopNotification')
      // eslint-disable-next-line prefer-promise-reject-errors
      .mockImplementation(() => Promise.reject());
    const peripheral = deviceMock.id;
    const service = femfitBLE.SENSOR_SERVICE;
    await expect(
      utils.removeServiceListener(peripheral, service),
    ).rejects.toThrowError();
  });
});

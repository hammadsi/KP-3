import {PermissionsAndroid} from 'react-native';

import checkAndroidPermission from '~utils/checkAndroidPermission';

describe('Test checkAndroidPermission', () => {
  it('should verify previously stored permission grant', async () => {
    const checkSpy = jest
      .spyOn(PermissionsAndroid, 'check')
      .mockImplementation(() => Promise.resolve(true));
    const reqSpy = jest
      .spyOn(PermissionsAndroid, 'request')
      .mockImplementation(() => Promise.resolve('granted'));
    await checkAndroidPermission('BLUETOOTH_SCAN');
    expect(checkSpy).toBeCalled();
    expect(reqSpy).not.toBeCalled();
  });

  it('should grant permission if user accepts', async () => {
    const checkSpy = jest
      .spyOn(PermissionsAndroid, 'check')
      .mockImplementation(() => Promise.resolve(false));
    const reqSpy = jest
      .spyOn(PermissionsAndroid, 'request')
      .mockImplementation(() => Promise.resolve('granted'));
    await checkAndroidPermission('BLUETOOTH_SCAN');
    expect(checkSpy).toBeCalled();
    expect(reqSpy).toBeCalled();
  });

  it('should not grant permission if user rejects', async () => {
    const checkSpy = jest
      .spyOn(PermissionsAndroid, 'check')
      .mockImplementation(() => Promise.resolve(false));
    const reqSpy = jest
      .spyOn(PermissionsAndroid, 'request')
      .mockImplementation(() => Promise.resolve('denied'));
    await checkAndroidPermission('BLUETOOTH_SCAN');
    expect(checkSpy).toBeCalled();
    expect(reqSpy).toBeCalled();
  });
});

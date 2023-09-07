import {merge} from 'lodash';
import React from 'react';
import BleManager from 'react-native-ble-manager';

import {BluetoothState} from '~state/ducks/bluetooth/bluetooth.interface';
import {initialState} from '~state/ducks/bluetooth/bluetooth.reducer';
import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import {render} from '~utils/test-utils';

import ConnectDeviceScreen from '../ConnectDeviceScreen';
jest.useFakeTimers();

describe('Test ConnectDeviceScreen-component', () => {
  beforeAll(() => {
    jest.spyOn(BleManager, 'scan').mockImplementation(() => Promise.resolve());
    jest
      .spyOn(BleManager, 'stopScan')
      .mockImplementation(() => Promise.resolve());
  });
  it('should render correctly', () => {
    const props: any = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    const authState: BluetoothState = {
      ...initialState,
      availableDevices: {[deviceMock.id]: deviceMock},
    };
    const store = mockStore(merge({auth: authState}, initialStore));
    jest
      .spyOn(store, 'dispatch')
      .mockImplementation(() => Promise.resolve() as any);
    const component = <ConnectDeviceScreen {...props} />;
    const tree = render(component, {wrapperProps: {store}});

    expect(tree.toJSON()).toMatchSnapshot();
  });
});

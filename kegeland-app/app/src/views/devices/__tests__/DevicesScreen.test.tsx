import {merge} from 'lodash';
import React from 'react';

import {BluetoothState} from '~state/ducks/bluetooth/bluetooth.interface';
import {initialState} from '~state/ducks/bluetooth/bluetooth.reducer';
import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import {render} from '~utils/test-utils';

import DevicesScreen from '../DevicesScreen';

describe('Test ConnectDeviceScreen-component', () => {
  it('should render correctly', () => {
    const props: any = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    const authState: BluetoothState = {
      ...initialState,
      connectedDevices: {[deviceMock.id]: deviceMock},
    };
    const store = mockStore(merge({auth: authState}, initialStore));
    const component = <DevicesScreen {...props} />;
    const tree = render(component, {wrapperProps: {store}});
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

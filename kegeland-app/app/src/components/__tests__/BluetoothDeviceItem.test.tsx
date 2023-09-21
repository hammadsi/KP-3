import React from 'react';

import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';
import {render} from '~utils/test-utils';

import BluetoothDeviceItem, {
  BluetoothDeviceItemProps,
} from '../BluetoothDeviceItem';

describe('Test BluetoothDeviceItem-component', () => {
  it('should render correctly', () => {
    const props: BluetoothDeviceItemProps = {
      device: deviceMock,
    };
    const component = <BluetoothDeviceItem {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('should render connected device correctly', () => {
    const props: BluetoothDeviceItemProps = {
      device: {...deviceMock, state: 'connected'},
    };
    const component = <BluetoothDeviceItem {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

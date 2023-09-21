import React from 'react';

import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';
import {render} from '~utils/test-utils';

import BluetoothDeviceList, {
  BluetoothDeviceListProps,
} from '../BluetoothDeviceList';

describe('Test BluetoothDeviceList-component', () => {
  it('should render correctly', () => {
    const props: BluetoothDeviceListProps = {
      devices: [deviceMock],
    };
    const component = <BluetoothDeviceList {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

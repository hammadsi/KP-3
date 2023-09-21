import React from 'react';
import {View} from 'react-native';
import {cloneDeep, set} from 'lodash';

import {render} from '~utils/test-utils';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import withDevice from '~hoc/withDevice';
import {BluetoothState} from '~state/ducks/bluetooth/bluetooth.interface';
import {initialState} from '~state/ducks/bluetooth/bluetooth.reducer';
import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Test withDevice-hoc', () => {
  const MockComponent: React.FC<any> = (props) => {
    return <View testID="MockComponent" {...props} />;
  };

  const bluetoothState: BluetoothState = {
    ...initialState,
    connectedDevices: {[deviceMock.id]: deviceMock},
  };
  const store = mockStore(
    set(cloneDeep(initialStore), 'bluetooth', bluetoothState),
  );

  it('should render correctly', () => {
    const Component = withDevice('femfit', MockComponent);
    const component = render(<Component />, {wrapperProps: {store}});
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should have a device in props', () => {
    const Component = withDevice('femfit', MockComponent);
    const component = render(<Component />, {wrapperProps: {store}});
    const device = component.getByTestId('MockComponent').props.device;
    expect(device).toBeTruthy();
    expect(device).toEqual(deviceMock);
  });
});

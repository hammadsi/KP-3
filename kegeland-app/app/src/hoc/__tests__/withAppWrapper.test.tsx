import React from 'react';
import {Text} from 'react-native';

import withAppWrapper from '~hoc/withAppWrapper';
import {render} from '~utils/test-utils';
import * as silentRefreshHook from '~hooks/useSilentRefresh';
import * as bluetoothHook from '~hooks/useBluetooth';

describe('Test withAppWrapper-hoc', () => {
  const MockComponent: React.FC = () => {
    return <Text />;
  };

  it('should render correctly', () => {
    const Component = withAppWrapper(MockComponent);
    const tree = render(<Component />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should call correct hooks', () => {
    const silentRefreshHookSpy = jest.spyOn(silentRefreshHook, 'default');
    const bluetoothHookSpy = jest.spyOn(bluetoothHook, 'default');
    const Component = withAppWrapper(MockComponent);
    render(<Component />);
    expect(silentRefreshHookSpy).toBeCalled();
    expect(bluetoothHookSpy).toBeCalled();
  });
});

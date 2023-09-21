import {cloneDeep, set} from 'lodash';
import React from 'react';

import {HOUSEKEEPING_SERVICE} from '~lib/femfit/bluetooth/constants';
import {BluetoothState} from '~state/ducks/bluetooth/bluetooth.interface';
import {initialState} from '~state/ducks/bluetooth/bluetooth.reducer';
import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import {render} from '~utils/test-utils';

import FemfitGame, {FemfitGameProps} from '../FemfitGame';
import exerciseMock from '../__mocks__/exercise.mock';
jest.useFakeTimers();
describe('Test FemfitGame-component', () => {
  const housekeepingService = HOUSEKEEPING_SERVICE;
  const bluetoothState: BluetoothState = {
    ...initialState,
    connectedDevices: {[deviceMock.id]: deviceMock},
    housekeepers: {[housekeepingService.uuid]: deviceMock.id},
  };

  const store = mockStore(
    set(cloneDeep(initialStore), 'bluetooth', bluetoothState),
  );
  it('should render correctly', () => {
    const navigation: any = {
      navigate: jest.fn(),
      setOptions: jest.fn(),
    };

    const props: FemfitGameProps = {
      device: deviceMock,
      setSession: jest.fn() as any,
      exercise: exerciseMock,
      clearAnswers: jest.fn() as any,
      navigation,
    };
    const component = <FemfitGame {...props} />;
    const tree = render(component, {wrapperProps: {store}});
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

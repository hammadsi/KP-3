import {merge} from 'lodash';
import React from 'react';

import {WithDeviceContext} from '~hoc/withDevice';
import {WithQuestionnaireContext} from '~hoc/withQuestionnaire';
import {BluetoothState} from '~state/ducks/bluetooth/bluetooth.interface';
import {initialState} from '~state/ducks/bluetooth/bluetooth.reducer';
import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import {render} from '~utils/test-utils';

import FemfitScreen from '../FemfitScreen';

describe('Test FemfitScreen-component', () => {
  it('should render correctly', () => {
    const hocProps: WithDeviceContext & WithQuestionnaireContext = {
      answers: [],
      device: deviceMock,
      questionnaireEnabled: true,
      questionnaireLoading: false,
      toggleQuestionnaire: jest.fn(),
    };

    const props: any = {
      navigation: {
        navigate: jest.fn(),
      },
      ...hocProps,
    };

    const authState: BluetoothState = {
      ...initialState,
      connectedDevices: {[deviceMock.id]: deviceMock},
    };
    const store = mockStore(merge({auth: authState}, initialStore));
    const component = <FemfitScreen {...props} />;
    const tree = render(component, {wrapperProps: {store}});
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

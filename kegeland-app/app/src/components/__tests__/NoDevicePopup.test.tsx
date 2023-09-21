import React from 'react';

import {deviceMock} from '~state/ducks/__mocks__/bluetooth.mocks';
import {render} from '~utils/test-utils';

import NoDevicePopup, {NoDevicePopupProps} from '../NoDevicePopup';

describe('Test NoDevicePopup-component', () => {
  it('should render correctly', () => {
    const props: NoDevicePopupProps = {
      visible: true,
      onDismiss: jest.fn(),
      deviceName: deviceMock.name,
    };
    const component = <NoDevicePopup {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

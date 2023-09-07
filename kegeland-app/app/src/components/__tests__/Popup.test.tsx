import React from 'react';
import {Text} from 'react-native';

import {render} from '~utils/test-utils';

import Popup, {PopupProps} from '../Popup';

describe('Test Popup-component', () => {
  it('should render correctly', () => {
    const props: Omit<PopupProps, 'children'> = {
      title: 'Test popup',
      visible: true,
    };
    const component = (
      <Popup {...props}>
        <Text>Test modal</Text>
      </Popup>
    );
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

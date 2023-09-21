import React from 'react';
import {Text} from 'react-native';

import {render} from '~utils/test-utils';

import AvoidKeyboard from '../AvoidKeyboard';

describe('Test AvoidKeyboard-component', () => {
  it('should render correctly', () => {
    const component = (
      <AvoidKeyboard>
        <Text>Test</Text>
      </AvoidKeyboard>
    );
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

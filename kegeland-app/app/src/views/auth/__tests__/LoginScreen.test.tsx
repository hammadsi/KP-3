import React from 'react';

import {render} from '~utils/test-utils';

import LoginScreen from '../LoginScreen';
jest.useFakeTimers();

describe('Test LoginScreen-component', () => {
  it('should render correctly', () => {
    const props: any = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    const component = <LoginScreen {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

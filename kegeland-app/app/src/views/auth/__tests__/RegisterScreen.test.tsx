import React from 'react';

import {render} from '~utils/test-utils';

import RegisterScreen from '../RegisterScreen';
jest.useFakeTimers();

describe('Test RegisterScreen-component', () => {
  it('should render correctly', () => {
    const props: any = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    const component = <RegisterScreen {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

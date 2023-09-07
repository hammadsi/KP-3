import React from 'react';

import {render} from '~utils/test-utils';

import LoginForm from '../LoginForm';
jest.useFakeTimers();

describe('Test LoginForm-component', () => {
  it('should render correctly', () => {
    const component = <LoginForm />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

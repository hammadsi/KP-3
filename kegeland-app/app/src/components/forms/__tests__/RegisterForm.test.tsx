import React from 'react';

import {render} from '~utils/test-utils';

import RegisterForm from '../RegisterForm';
jest.useFakeTimers();

describe('Test RegisterForm-component', () => {
  it('should render correctly', () => {
    const component = <RegisterForm />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

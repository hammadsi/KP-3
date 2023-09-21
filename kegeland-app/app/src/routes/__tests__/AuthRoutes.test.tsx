import React from 'react';

import {render} from '~utils/test-utils';

import AuthRoutes from '../AuthRoutes';
jest.useFakeTimers();

describe('Test AuthRoutes-component', () => {
  it('should render correctly', () => {
    const component = <AuthRoutes />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

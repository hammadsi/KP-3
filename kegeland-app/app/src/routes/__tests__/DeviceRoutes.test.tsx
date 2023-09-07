import React from 'react';

import {render} from '~utils/test-utils';

import DeviceRoutes from '../DeviceRoutes';

describe('Test DeviceRoutes-component', () => {
  it('should render correctly', () => {
    const component = <DeviceRoutes />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

import React from 'react';

import {render} from '~utils/test-utils';

import SettingsRoutes from '../SettingsRoutes';

describe('Test SettingsRoutes-component', () => {
  const errorSpy = jest
    .spyOn(global.console, 'error')
    .mockImplementation(() => {});
  afterAll(() => {
    errorSpy.mockRestore();
  });
  it('should render correctly', () => {
    const component = <SettingsRoutes />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

import React from 'react';

import {render} from '~utils/test-utils';

import Router from '../Router';

describe('Test Router-component', () => {
  it('should render correctly', () => {
    const component = <Router />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

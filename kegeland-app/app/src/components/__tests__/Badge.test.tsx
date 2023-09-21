import React from 'react';

import {render} from '~utils/test-utils';

import Badge from '../Badge';

describe('Test Badge-component', () => {
  it('should render correctly', () => {
    const component = <Badge>1</Badge>;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

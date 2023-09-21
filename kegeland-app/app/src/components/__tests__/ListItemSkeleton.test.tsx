import React from 'react';

import {render} from '~utils/test-utils';

import ListItemSkeleton from '../ListItemSkeleton';

describe('Test ListItemSkeleton-component', () => {
  it('should render correctly', () => {
    const component = <ListItemSkeleton />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

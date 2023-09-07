import React from 'react';

import {render} from '~utils/test-utils';

import Skeleton from '../Skeleton';

describe('Test Skeleton-component', () => {
  it('should render correctly', () => {
    const component = <Skeleton />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

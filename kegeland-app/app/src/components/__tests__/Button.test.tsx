import React from 'react';

import {render} from '~utils/test-utils';

import Button from '../Button';

describe('Test Button-component', () => {
  it('should render correctly', () => {
    const component = <Button>1</Button>;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

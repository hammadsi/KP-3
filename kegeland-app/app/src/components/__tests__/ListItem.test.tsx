import React from 'react';

import {render} from '~utils/test-utils';

import ListItem, {ListItemProps} from '../ListItem';

describe('Test ListItem-component', () => {
  it('should render correctly', () => {
    const props: ListItemProps = {
      title: 'Test',
    };
    const component = <ListItem {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render skeleton on loading', () => {
    const props: ListItemProps = {
      title: 'Test',
      loading: true,
    };
    const component = <ListItem {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

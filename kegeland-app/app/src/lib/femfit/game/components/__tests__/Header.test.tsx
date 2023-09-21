import React from 'react';

import {render} from '~utils/test-utils';

import Header, {HeaderProps} from '../Header';

describe('Test Header-component', () => {
  it('should render correctly', () => {
    const props: HeaderProps = {
      score: 10,
      toggle: jest.fn(),
    };
    const component = <Header {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

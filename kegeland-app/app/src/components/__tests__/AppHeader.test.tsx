import React from 'react';

import {render} from '~utils/test-utils';

import AppHeader from '../AppHeader';

describe('Test Accordion-component', () => {
  it('should render correctly', () => {
    const props: any = {
      navigation: {
        goBack: jest.fn(),
      },
      back: {title: 'Home'},
    };
    const component = <AppHeader {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('should render without back button', () => {
    const props: any = {
      navigation: {
        goBack: jest.fn(),
      },
      back: undefined,
    };
    const component = <AppHeader {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

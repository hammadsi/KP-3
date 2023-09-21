import React from 'react';

import {render} from '~utils/test-utils';

import ForgotPasswordScreen from '../ForgotPasswordScreen';
jest.useFakeTimers();

describe('Test ForgotPasswordScreen-component', () => {
  it('should render correctly', () => {
    const props: any = {};
    const component = <ForgotPasswordScreen {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

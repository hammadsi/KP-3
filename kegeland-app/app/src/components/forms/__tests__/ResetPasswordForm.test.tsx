import React from 'react';

import {render} from '~utils/test-utils';

import ResetPasswordForm from '../ResetPasswordForm';
jest.useFakeTimers();

describe('Test ResetPasswordForm-component', () => {
  it('should render correctly', () => {
    const component = <ResetPasswordForm />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

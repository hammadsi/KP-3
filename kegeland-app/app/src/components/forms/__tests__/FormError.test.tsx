import React from 'react';

import {render} from '~utils/test-utils';

import FormError, {FormErrorProps} from '../FormError';

describe('Test FormError-component', () => {
  it('should render correctly', () => {
    const props: FormErrorProps = {
      error: 'error',
    };
    const component = <FormError {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

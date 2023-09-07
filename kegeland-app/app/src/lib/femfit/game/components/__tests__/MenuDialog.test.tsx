import React from 'react';

import {render} from '~utils/test-utils';

import MenuDialog, {MenuDialogProps} from '../MenuDialog';

describe('Test MenuDialog-component', () => {
  it('should render correctly', () => {
    const props: MenuDialogProps = {
      visible: true,
      goBack: jest.fn(),
      onDismiss: jest.fn(),
    };
    const component = <MenuDialog {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

import React from 'react';

import {render} from '~utils/test-utils';

import Section, {SectionProps} from '../Section';

describe('Test Section-component', () => {
  it('should render correctly', () => {
    const props: SectionProps = {
      title: 'Test section',
    };
    const component = <Section {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {render} from '~utils/test-utils';

import Accordion from '../Accordion';

describe('Test Accordion-component', () => {
  it('should render correctly', () => {
    const component = (
      <Accordion title="Test accordion">
        <Text>Test</Text>
      </Accordion>
    );
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render with icon given as string', () => {
    const component = (
      <Accordion title="Test accordion" icon="account-circle-outline">
        <Text>Test</Text>
      </Accordion>
    );
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render with icon given as a component', () => {
    const component = (
      <Accordion
        title="Test accordion"
        icon={<Icon size={30} color="#0081cb" name="chevron-left" />}>
        <Text>Test</Text>
      </Accordion>
    );
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

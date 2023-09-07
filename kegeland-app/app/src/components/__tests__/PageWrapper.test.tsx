import React from 'react';
import {Text} from 'react-native';

import {render} from '~utils/test-utils';

import PageWrapper, {PageWrapperProps} from '../PageWrapper';

describe('Test PageWrapper-component', () => {
  it('should render correctly', () => {
    const props: Omit<PageWrapperProps, 'children'> = {
      title: 'Test page',
    };
    const component = (
      <PageWrapper {...props}>
        <Text>Test</Text>
      </PageWrapper>
    );
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render correctly with content size = full', () => {
    const props: Omit<PageWrapperProps, 'children'> = {
      title: 'Test page',
      contentSize: 'full',
    };
    const component = (
      <PageWrapper {...props}>
        <Text>Test</Text>
      </PageWrapper>
    );
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render correctly with content size = large', () => {
    const props: Omit<PageWrapperProps, 'children'> = {
      title: 'Test page',
      contentSize: 'large',
    };
    const component = (
      <PageWrapper {...props}>
        <Text>Test</Text>
      </PageWrapper>
    );
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render correctly with content size = medium', () => {
    const props: Omit<PageWrapperProps, 'children'> = {
      title: 'Test page',
      contentSize: 'medium',
    };
    const component = (
      <PageWrapper {...props}>
        <Text>Test</Text>
      </PageWrapper>
    );
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

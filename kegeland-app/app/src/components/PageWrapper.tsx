import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

type ContentSize = 'small' | 'medium' | 'large' | 'full';

export type PageWrapperProps = {
  title: string;
  contentSize?: ContentSize;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  children: React.ReactNode;
};

/**
 * Retrieves the page's padding based on it's defined content size
 * @param contentSize the content size
 * @see {@link ContentSize}
 * @returns the padding
 */
const getPadding = (contentSize?: ContentSize) => {
  switch (contentSize) {
    case 'full':
      return 0;
    case 'large':
      return 8;
    case 'medium':
      return 16;
    default:
      return 32;
  }
};

/**
 * Component for rendering page layout.
 * @param props the props
 * @see {@link PageWrapperProps}
 */
const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  contentSize,
  style,
  testID,
  children,
}) => {
  return (
    <SafeAreaView
      testID={testID}
      style={[
        styles.wrapper,
        {paddingHorizontal: getPadding(contentSize)},
        style,
      ]}>
      <Title style={styles.title}>{title}</Title>
      {children}
    </SafeAreaView>
  );
};

PageWrapper.defaultProps = {
  contentSize: 'small',
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    marginTop: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default PageWrapper;

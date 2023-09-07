import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Divider, Surface, Title} from 'react-native-paper';

export type SectionProps = {
  title: string;
  style?: ViewStyle;
  children?: React.ReactNode;
};

/**
 * Component for rendering a section.
 * @param props the props
 * @see {@link SectionProps}
 */
const Section: React.FC<SectionProps> = ({title, children, ...props}) => {
  return (
    <Surface style={[styles.surface, props.style]}>
      <Title style={styles.title}>{title}</Title>
      <Divider />
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default Section;

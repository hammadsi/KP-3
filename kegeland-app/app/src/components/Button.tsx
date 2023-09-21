import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';

export type ButtonProps = React.ComponentProps<typeof PaperButton>;

/**
 * Component for rendering a button.
 * @param props the props
 * @see {@link ButtonProps}
 * @see {@link Button}
 */
const Button: React.FC<ButtonProps> = (props) => {
  return (
    <PaperButton
      {...props}
      labelStyle={
        props.labelStyle
          ? [styles.buttonLabel, props.labelStyle]
          : styles.buttonLabel
      }
      contentStyle={
        props.contentStyle
          ? [styles.buttonContent, props.contentStyle]
          : styles.buttonContent
      }
    />
  );
};

const styles = StyleSheet.create({
  buttonContent: {
    paddingVertical: 5,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default Button;

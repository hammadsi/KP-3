import React from 'react';
import {
  KeyboardAvoidingViewProps,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

/**
 * Component for avoiding the mobile keyboard from overlaying the onscreen content.
 * @param props the props
 * @see {@link KeyboardAvoidingViewProps}
 * @see {@link KeyboardAvoidingView}
 */
const AvoidKeyboard: React.FC<KeyboardAvoidingViewProps> = ({
  children,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled={Platform.OS === 'ios'}
      {...props}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default AvoidKeyboard;

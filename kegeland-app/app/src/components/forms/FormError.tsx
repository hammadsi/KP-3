import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';

import useAppDispatch from '~hooks/useAppDispatch';
import {clearError} from '~state/ducks/auth/auth.reducer';
import Button from '~components/Button';

export type FormErrorProps = {
  error?: string;
};

/**
 * Component for rendering a form error popup
 * @param props the props
 * @see {@link FormErrorProps}
 */
const FormError: React.FC<FormErrorProps> = ({error}) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = React.useState(error !== undefined);

  useEffect(() => {
    setVisible(error !== undefined);
  }, [error]);

  /**
   * Hide the error popup
   */
  const hideDialog = () => {
    dispatch(clearError());
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title style={styles.title}>Error</Dialog.Title>
        <Dialog.Content testID="FormErrorModal">
          <Text style={styles.error}>{error}</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button
            onPress={hideDialog}
            labelStyle={styles.error}
            children="Dismiss"
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  error: {
    textAlign: 'center',
  },
  actions: {
    justifyContent: 'center',
  },
  button: {fontSize: 18},
});

export default FormError;

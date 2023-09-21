import React from 'react';
import {StyleSheet, View} from 'react-native';

import AvoidKeyboard from '~components/AvoidKeyboard';
import PageWrapper from '~components/PageWrapper';
import ResetPasswordForm from '~components/forms/ResetPasswordForm';
import {AuthScreenProps} from '~routes/interface';

/**
 * ForgotPasswordScreen. Screen resetting forgotten password
 * @see {@link AuthScreenProps}
 */
const ForgotPasswordScreen: React.FC<
  AuthScreenProps<'Forgot password'>
> = () => {
  return (
    <PageWrapper title="Reset Password" testID="ForgotPasswordScreen">
      <AvoidKeyboard style={styles.wrapper}>
        <View style={styles.formWrapper}>
          <ResetPasswordForm />
        </View>
      </AvoidKeyboard>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginVertical: 30,
  },
  formWrapper: {
    flex: 1,
  },
});

export default ForgotPasswordScreen;

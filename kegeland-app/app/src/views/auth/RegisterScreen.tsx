import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, useTheme} from 'react-native-paper';

import AvoidKeyboard from '~components/AvoidKeyboard';
import PageWrapper from '~components/PageWrapper';
import RegisterForm from '~components/forms/RegisterForm';
import {AuthScreenProps} from '~routes/interface';

/**
 * ForgotPasswordScreen. Screen where users can register
 * @see {@link AuthScreenProps}
 */
const RegisterScreen: React.FC<AuthScreenProps<'Register'>> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  return (
    <PageWrapper title="Sign Up" testID="RegisterScreen">
      <AvoidKeyboard style={styles.wrapper}>
        <View style={styles.formWrapper}>
          <RegisterForm />
        </View>
        <View style={styles.signInSection}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={[
                styles.signInText,
                styles.signInBtn,
                {color: colors.primary},
              ]}>
              Sign in
            </Text>
          </TouchableOpacity>
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
  signInSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  signInText: {
    textAlignVertical: 'center',
    fontSize: 16,
  },
  signInBtn: {
    fontSize: 17,
    fontWeight: '700',
  },
});

export default RegisterScreen;

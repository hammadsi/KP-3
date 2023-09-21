import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, useTheme} from 'react-native-paper';

import AvoidKeyboard from '~components/AvoidKeyboard';
import LoginForm from '~components/forms/LoginForm';
import PageWrapper from '~components/PageWrapper';
import {AuthScreenProps} from '~routes/interface';

/**
 * LoginScreen. Screen where users can sign in
 * @see {@link AuthScreenProps}
 */
const LoginScreen: React.FC<AuthScreenProps<'Login'>> = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <PageWrapper title="Sign In" style={styles.page} testID="LoginScreen">
      <AvoidKeyboard style={styles.wrapper}>
        <View style={styles.formWrapper}>
          <LoginForm />
        </View>
        <View style={styles.signUpSection}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={[
                styles.signUpText,
                styles.signUpBtn,
                {color: colors.primary},
              ]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </AvoidKeyboard>
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  page: {
    marginTop: 30,
  },
  wrapper: {
    flex: 1,
    marginVertical: 30,
  },
  formWrapper: {
    flex: 1,
  },
  signUpSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  signUpText: {
    textAlignVertical: 'center',
    fontSize: 16,
  },
  signUpBtn: {
    fontSize: 17,
    fontWeight: '700',
  },
});

export default LoginScreen;

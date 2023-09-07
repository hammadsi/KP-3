import {useForm} from 'react-hook-form';
import {Dialog, Portal, Text} from 'react-native-paper';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {ScrollView} from 'react-native-gesture-handler';

import useAppDispatch from '~hooks/useAppDispatch';
import {resetPassword} from '~state/ducks/auth/auth.actions';
import useAppSelector from '~hooks/useAppSelector';
import {AuthScreenProps} from '~routes/interface';
import {clearError} from '~state/ducks/auth/auth.reducer';
import Button from '~components/Button';

import FormInput from './FormInput';
import FormError from './FormError';

type ResetPasswordFormData = {
  email: string;
};

const schema = yup.object({
  email: yup.string().nullable().email().required().label('Email'),
});

/**
 * Component for rendering the reset password form.
 */
const ResetPasswordForm: React.FC = () => {
  const navigation =
    useNavigation<AuthScreenProps<'Forgot password'>['navigation']>();
  const dispatch = useAppDispatch();
  const [mailSent, setMailSent] = useState<boolean>(false);
  const {loading, error} = useAppSelector(({auth}) => auth);
  const {control, handleSubmit, formState, reset} =
    useForm<ResetPasswordFormData>({
      mode: 'onSubmit',
      resolver: yupResolver(schema),
    });

  useFocusEffect(
    useCallback(() => {
      return () => {
        setMailSent(false);
        reset();
        dispatch(clearError());
      };
    }, []),
  );

  const onSubmit = (data: ResetPasswordFormData) => {
    setMailSent(true);
    dispatch(resetPassword(data));
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <FormInput
          state={formState}
          control={control}
          testID="ResetEmailInput"
          name="email"
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>
      <Button
        mode="contained"
        loading={loading}
        onPress={handleSubmit(onSubmit)}>
        Reset password
      </Button>
      <FormError error={error} />
      <Portal>
        <Dialog visible={mailSent && !loading}>
          <Dialog.Title style={styles.title}>Check your email!</Dialog.Title>
          <Dialog.Content>
            <Text textBreakStrategy="simple" style={styles.content}>
              Please check the inbox of the email address you entered for a link
              to reset your password.
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.actions}>
            <Button
              testID="ResetSubmit"
              onPress={() => navigation.navigate('Login')}
              labelStyle={styles.button}
              children="Login"
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  title: {
    textAlign: 'center',
  },
  content: {
    textAlign: 'left',
  },
  actions: {
    justifyContent: 'center',
  },
  button: {fontSize: 18},
});

export default ResetPasswordForm;

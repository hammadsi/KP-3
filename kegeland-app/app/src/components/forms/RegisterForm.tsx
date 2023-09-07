import {useForm} from 'react-hook-form';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import * as yup from 'yup';

import useAppDispatch from '~hooks/useAppDispatch';
import {signUpUser} from '~state/ducks/auth/auth.actions';
import {RegisterDTO} from '~state/ducks/auth/auth.interface';
import {UserRole} from '~constants/auth';
import useAppSelector from '~hooks/useAppSelector';
import {clearError} from '~state/ducks/auth/auth.reducer';
import Button from '~components/Button';

import FormInput from './FormInput';
import FormError from './FormError';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  firstName: yup.string().nullable().required().label('First name'),
  lastName: yup.string().nullable().required().label('Last name'),
  email: yup.string().nullable().email().required().label('Email'),
  password: yup.string().nullable().required().min(6).label('Password'),
  confirmPassword: yup
    .string()
    .nullable()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Confirm password'),
});

/**
 * Component for rendering the register form.
 */
const RegisterForm: React.FC = () => {
  const {error, loading} = useAppSelector(({auth}) => auth);
  const dispatch = useAppDispatch();
  const {control, handleSubmit, formState, reset} = useForm<RegisterFormData>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset();
        dispatch(clearError());
      };
    }, []),
  );

  const onSubmit = (data: RegisterFormData) => {
    const {firstName, lastName, email, password} = data;
    const payload: RegisterDTO = {
      email,
      password,
      name: {firstName, lastName},
      roles: [UserRole.PATIENT],
    };

    dispatch(signUpUser(payload));
  };

  return (
    <ScrollView testID="RegisterForm">
      <View style={styles.form}>
        <FormInput
          state={formState}
          control={control}
          testID="RegisterFirstNameInput"
          name="firstName"
          icon="form-textbox"
          autoCapitalize="words"
          placeholder="First name"
        />
        <FormInput
          state={formState}
          control={control}
          testID="RegisterLastNameInput"
          name="lastName"
          icon="form-textbox"
          autoCapitalize="words"
          placeholder="Last name"
        />
        <FormInput
          state={formState}
          control={control}
          testID="RegisterEmailInput"
          name="email"
          placeholder="Email"
          icon="at"
          keyboardType="email-address"
        />
        <FormInput
          state={formState}
          control={control}
          secureTextEntry
          testID="RegisterPasswordInput"
          name="password"
          icon="lock-outline"
          placeholder="Password"
        />
        <FormInput
          state={formState}
          control={control}
          testID="RegisterConfirmPasswordInput"
          name="confirmPassword"
          placeholder="Confirm password"
          icon="lock-check-outline"
          secureTextEntry
        />
      </View>
      <Button
        mode="contained"
        loading={loading}
        testID="RegisterSubmit"
        onPress={handleSubmit(onSubmit)}>
        Register
      </Button>
      <FormError error={error} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
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

export default RegisterForm;

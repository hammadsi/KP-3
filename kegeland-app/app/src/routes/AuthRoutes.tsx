import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import AppHeader from '~components/AppHeader';
import withAuthPortal from '~hoc/withAuthPortal';
import ForgotPasswordScreen from '~views/auth/ForgotPasswordScreen';
import LoginScreen from '~views/auth/LoginScreen';
import RegisterScreen from '~views/auth/RegisterScreen';

import {AuthStackParamList} from './interface';

const AuthStack = createStackNavigator<AuthStackParamList>();

/**
 * AuthRoutes. Configure the routes within the auth stack
 */
const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: (props) => <AppHeader {...props} />,
        headerShown: true,
      }}>
      <AuthStack.Screen name="Login" component={withAuthPortal(LoginScreen)} />
      <AuthStack.Screen
        name="Register"
        component={withAuthPortal(RegisterScreen)}
      />
      <AuthStack.Screen
        name="Forgot password"
        component={withAuthPortal(ForgotPasswordScreen)}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;

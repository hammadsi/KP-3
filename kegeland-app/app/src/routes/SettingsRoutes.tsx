import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import AppHeader from '~components/AppHeader';
import ConnectDeviceScreen from '~views/settings/ConnectDeviceScreen';
import SettingsScreen from '~views/settings/SettingsScreen';

import {SettingsStackParamList} from './interface';

export const SettingsStack = createStackNavigator<SettingsStackParamList>();

/**
 * SettingsRoutes. Configure the routes within the settings stack
 */
const SettingsRoutes: React.FC = () => {
  return (
    <SettingsStack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        header: (props) => <AppHeader {...props} />,
        headerShown: true,
      }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen
        name="Connect device"
        component={ConnectDeviceScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsRoutes;

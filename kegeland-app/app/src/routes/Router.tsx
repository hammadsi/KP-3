import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AuthRoutes from './AuthRoutes';
import DeviceRoutes from './DeviceRoutes';
import {RootTabParamList} from './interface';
import SettingsRoutes from './SettingsRoutes';

const tabIcons: Record<keyof RootTabParamList, string> = {
  AuthStack: 'person',
  DeviceStack: 'home',
  SettingsStack: 'settings',
};

const Tab = createBottomTabNavigator<RootTabParamList>();

/**
 * Base router for mounting all routes within the app
 * @param props props passed from higher-order component, like React Navigation
 */
const Router: React.FC<any> = (props: any) => {
  return (
    <Tab.Navigator
      {...props}
      initialRouteName="DeviceStack"
      screenOptions={({route}) => {
        return {
          tabBarTestID: route.name,
          tabBarIcon: ({color, size}) => {
            return (
              <Icon name={tabIcons[route.name]} size={size} color={color} />
            );
          },
          unmountOnBlur: true,
          tabBarShowLabel: false,
          headerShown: false,
        };
      }}>
      <Tab.Screen name="AuthStack" component={AuthRoutes} />
      <Tab.Screen
        name="DeviceStack"
        component={DeviceRoutes}
        options={({route}) => {
          const options: BottomTabNavigationOptions = {};
          const routeName = getFocusedRouteNameFromRoute(route) ?? null;
          if (routeName && routeName !== 'Devices') {
            options.tabBarStyle = {display: 'none'};
          }
          return options;
        }}
      />
      <Tab.Screen name="SettingsStack" component={SettingsRoutes} />
    </Tab.Navigator>
  );
};

export default Router;

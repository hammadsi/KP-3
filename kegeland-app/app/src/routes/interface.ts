import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {StackScreenProps} from '@react-navigation/stack';

/**
 * Navigation interface for auth routes
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  'Forgot password': undefined;
};

export type DeviceStackParamList = {
  Devices: undefined;
  Femfit: undefined;
};

/**
 * Navigation interface for settings routes
 */
export type SettingsStackParamList = {
  Settings: undefined;
  'Connect device': undefined;
};

/**
 * Base navigation interface
 */
export type RootTabParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList> | undefined;
  DeviceStack: NavigatorScreenParams<DeviceStackParamList> | undefined;
  SettingsStack: NavigatorScreenParams<SettingsStackParamList> | undefined;
};

/**
 * Interface for screens on root-level
 */
export type RootScreenProps<
  RouteName extends keyof RootTabParamList = keyof RootTabParamList,
> = BottomTabScreenProps<RootTabParamList, RouteName>;

/**
 * Interface for screens under the auth-stack
 */
export type AuthScreenProps<
  RouteName extends keyof AuthStackParamList = keyof AuthStackParamList,
> = CompositeScreenProps<
  StackScreenProps<AuthStackParamList, RouteName>,
  BottomTabScreenProps<RootTabParamList>
>;

export type DeviceScreenProps<
  RouteName extends keyof DeviceStackParamList = keyof DeviceStackParamList,
> = CompositeScreenProps<
  StackScreenProps<DeviceStackParamList, RouteName>,
  BottomTabScreenProps<RootTabParamList>
>;

/**
 * Interface for screens under the settings-stack
 */
export type SettingsScreenProps<
  RouteName extends keyof SettingsStackParamList = keyof SettingsStackParamList,
> = CompositeScreenProps<
  StackScreenProps<SettingsStackParamList, RouteName>,
  BottomTabScreenProps<RootTabParamList>
>;

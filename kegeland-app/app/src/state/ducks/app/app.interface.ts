import {RootTabParamList} from '~routes/interface';

export type AppSettings = {
  darkMode: boolean;
};

export type SettingsProperty<K extends keyof AppSettings> = {
  key: K;
  value: AppSettings[K];
};

export type AnchorRoute<RouteName extends keyof RootTabParamList> =
  undefined extends RootTabParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params: RootTabParamList[RouteName]]
    : [screen: RouteName, params: RootTabParamList[RouteName]];

export interface AppState {
  anchorRoute: AnchorRoute<keyof RootTabParamList> | undefined;
  settings: AppSettings;
}

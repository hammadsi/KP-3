import {AnchorRoute, SettingsProperty} from '../app/app.interface';

export const anchor: AnchorRoute<'SettingsStack'> = [
  'SettingsStack',
  {screen: 'Settings'},
];

export const settingsPayload: SettingsProperty<'darkMode'> = {
  key: 'darkMode',
  value: true,
};

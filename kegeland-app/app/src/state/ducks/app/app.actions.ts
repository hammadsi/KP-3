import {PayloadAction} from '@reduxjs/toolkit';

import {AppSettings, SettingsProperty} from './app.interface';

/**
 * Updates a setting in the settings state.
 * @param payload the setting to update
 * @see {@link AppSettings}
 */
export function updateSetting<T extends keyof AppSettings>(
  payload: SettingsProperty<T>,
): PayloadAction<SettingsProperty<T>> {
  return {
    type: 'updateSetting',
    payload,
  };
}
updateSetting.type = 'updateSetting';

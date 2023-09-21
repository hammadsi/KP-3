import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootTabParamList} from '~routes/interface';

import {updateSetting} from './app.actions';
import {AnchorRoute, AppState} from './app.interface';

/**
 * The initial app state
 */
export const initialState: AppState = {
  anchorRoute: undefined,
  settings: {
    darkMode: false,
  },
};

/**
 * The reducer for settings state
 */
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAnchorRoute: (
      state,
      action: PayloadAction<AnchorRoute<keyof RootTabParamList> | undefined>,
    ) => {
      state.anchorRoute = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateSetting, (state, action) => {
      const {key, value} = action.payload;
      state.settings[key] = value;
    });
  },
});

export const {setAnchorRoute} = settingsSlice.actions;

export default settingsSlice.reducer;

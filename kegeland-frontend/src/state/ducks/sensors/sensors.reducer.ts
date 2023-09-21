import { createSlice } from '@reduxjs/toolkit';

import {
  isPendingAction,
  isFulfilledAction,
  isRejectedAction,
} from '../../../utils/thunk.utils';

import { fetchSensor } from './sensors.actions';
import { SensorState } from './sensors.interface';

export const initialState: SensorState = {
  loading: false,
  data: {},
  error: undefined,
};

const sensorSlice = createSlice({
  name: 'sensors',
  initialState,
  reducers: {
    clearSensorsState: (state) => {
      state.loading = false;
      state.data = {};
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensor.fulfilled, (state, { payload }) => {
        state.data[payload.name] = payload;
      })
      .addMatcher(
        (action) => isPendingAction(action, 'sensors'),
        (state) => {
          state.loading = true;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isFulfilledAction(action, 'sensors'),
        (state) => {
          state.loading = false;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isRejectedAction(action, 'sensors'),
        (state, { error }) => {
          state.loading = false;
          state.error = error.message;
        },
      );
  },
});

export const { clearSensorsState } = sensorSlice.actions;

export const sensorReducer = sensorSlice.reducer;

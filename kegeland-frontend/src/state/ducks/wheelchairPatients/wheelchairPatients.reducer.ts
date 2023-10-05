/*

In this reducer:

We defined an interface WheelchairPatientsState which includes:
loading: a boolean indicating whether data is being loaded.
wheelchairPatients: representing the list of all wheelchair patients.
wheelchairPatient: representing a single wheelchair patient.
error: a string to store any error messages.
The initialState is defined based on WheelchairPatientsState.
We created a slice using createSlice.
Inside extraReducers, we handle different states of the fetchWheelchairPatientById async action:
When the action is pending, loading is set to true and error is reset.
When the action is fulfilled, loading is set to false, wheelchairPatient is updated with the payload, and error is reset.
When the action is rejected, loading is set to false and error is updated with the error message.

This structure allows you to manage the state for individual wheelchair patients and handle the loading state and possible errors during fetch operations. You can similarly handle actions for fetching multiple wheelchair patients if such actions are defined.

*/

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  WheelchairPatients,
  WheelchairPatient,
  WheelchairPatientsState,
} from './wheelchairPatients.interface';
import { fetchWheelchairPatientById } from './wheelchairPatients.actions';

export const initialState: WheelchairPatientsState = {
  loading: false,
  wheelchairPatients: null,
  wheelchairPatient: null,
  error: null,
};

export const wheelchairPatientsSlice = createSlice({
  name: 'wheelchairPatients',
  initialState,
  reducers: {
    clearWheelchairPatientsState: (state) => {
      state.loading = false;
      state.wheelchairPatients = null;
      state.wheelchairPatient = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWheelchairPatientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWheelchairPatientById.fulfilled,
        (state, action: PayloadAction<WheelchairPatient>) => {
          state.loading = false;
          state.wheelchairPatient = action.payload;
          state.error = null;
        },
      )
      .addCase(fetchWheelchairPatientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { clearWheelchairPatientsState } = wheelchairPatientsSlice.actions;

export default wheelchairPatientsSlice.reducer;

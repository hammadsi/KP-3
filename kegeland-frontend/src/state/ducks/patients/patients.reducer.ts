import { createSlice } from '@reduxjs/toolkit';

import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '../../../utils/thunk.utils';

import { fetchPatientById, fetchPatients } from './patients.actions';
import { PatientsState } from './patients.interface';

export const initialState: PatientsState = {
  loading: false,
  patient: undefined,
  data: [],
  error: undefined,
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearPatientsState: (state) => {
      state.loading = false;
      state.patient = undefined;
      state.data = [];
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.patient = action.payload;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addMatcher(
        (action) => isPendingAction(action, 'patients'),
        (state) => {
          state.loading = true;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isFulfilledAction(action, 'patients'),
        (state) => {
          state.loading = false;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isRejectedAction(action, 'patients'),
        (state, { error }) => {
          state.loading = false;
          state.error = error.message;
        },
      );
  },
});

export const { clearPatientsState } = patientsSlice.actions;

export default patientsSlice.reducer;

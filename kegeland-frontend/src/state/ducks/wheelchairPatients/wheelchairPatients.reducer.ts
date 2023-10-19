import { createSlice } from '@reduxjs/toolkit';

import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '../../../utils/thunk.utils';

import {
  addEmptyGameSession,
  fetchWheelchairPatientById,
  updateGameSession,
  updatePatientData,
} from './wheelchairPatients.actions';
import { WheelchairPatientsState } from './wheelchairPatients.interface';

export const initialState: WheelchairPatientsState = {
  loading: false,
  wheelchairPatient: undefined,
  data: [],
  error: undefined,
};

const wheelchairPatientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearWheelchairPatientsState: (state) => {
      state.loading = false;
      state.wheelchairPatient = undefined;
      state.data = [];
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWheelchairPatientById.fulfilled, (state, action) => {
        state.wheelchairPatient = action.payload;
      })
      .addCase(updatePatientData.fulfilled, (state, action) => {
        if (state.wheelchairPatient) {
          state.wheelchairPatient.currentPhysicalState =
            action.payload.currentPhysicalState;
        }
      })
      .addCase(addEmptyGameSession.fulfilled, (state, action) => {
        if (state.wheelchairPatient) {
          if (!state.wheelchairPatient.gameSessions) {
            state.wheelchairPatient.gameSessions = [];
          }
          state.wheelchairPatient.gameSessions.push(action.payload);
        }
      })
      .addCase(updateGameSession.fulfilled, (state, action) => {
        if (state.wheelchairPatient) {
          const sessionIndex = state.wheelchairPatient.gameSessions.findIndex(
            (session) => session.sessionId === action.payload.sessionId
          );
          if (sessionIndex > -1) {
            state.wheelchairPatient.gameSessions[sessionIndex] = action.payload;
          }
        }
      })
      .addMatcher(
        (action) => isPendingAction(action, 'wheelchairPatients'),
        (state) => {
          state.loading = true;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isFulfilledAction(action, 'wheelchairPatients'),
        (state) => {
          state.loading = false;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isRejectedAction(action, 'wheelchairPatients'),
        (state, { error }) => {
          state.loading = false;
          state.error = error.message;
        },
      );
  },
});

export const { clearWheelchairPatientsState } = wheelchairPatientsSlice.actions;

export default wheelchairPatientsSlice.reducer;

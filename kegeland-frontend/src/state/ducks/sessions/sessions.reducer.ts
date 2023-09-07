import { createSlice } from '@reduxjs/toolkit';
import { chain } from 'lodash';

import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '../../../utils/thunk.utils';

import { fetchSessionById, fetchSessions } from './sessions.actions';
import { SessionsState } from './sessions.interface';

export const initialState: SessionsState = {
  loading: false,
  session: undefined,
  data: [],
  error: undefined,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    clearSessionsState: (state) => {
      state.loading = false;
      state.session = undefined;
      state.data = [];
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionById.fulfilled, (state, action) => {
        const { data, ...payload } = action.payload;
        state.session = {
          ...payload,
          data: chain(data).toPairs().sortBy(0).fromPairs().value(),
        };
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addMatcher(
        (action) => isPendingAction(action, 'sessions'),
        (state) => {
          state.loading = true;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isFulfilledAction(action, 'sessions'),
        (state) => {
          state.loading = false;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isRejectedAction(action, 'sessions'),
        (state, { error }) => {
          state.loading = false;
          state.error = error.message;
        },
      );
  },
});

export const { clearSessionsState } = sessionsSlice.actions;

export default sessionsSlice.reducer;

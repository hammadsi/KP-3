import { createSlice } from '@reduxjs/toolkit';

import {
  isPendingAction,
  isFulfilledAction,
  isRejectedAction,
} from '../../../utils/thunk.utils';

import { signInUser, signOutUser, signUpUser, refresh } from './auth.actions';
import { signOutReducer, signInReducer } from './auth.helpers';
import { AuthState } from './auth.interface';

export const initialState: AuthState = {
  ready: false,
  loading: false,
  isSignedIn: false,
  authUser: undefined,
  userDetails: undefined,
  error: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, signInReducer)
      .addCase(signOutUser.fulfilled, signOutReducer)
      .addCase(signOutUser.rejected, signOutReducer)
      .addCase(refresh.rejected, signOutReducer)
      .addCase(signUpUser.fulfilled, signInReducer)
      .addMatcher(
        (action) => isPendingAction(action, 'auth'),
        (state) => {
          state.loading = true;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isFulfilledAction(action, 'auth'),
        (state) => {
          state.loading = false;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isRejectedAction(action, 'auth'),
        (state, { error }) => {
          state.loading = false;
          state.error = error.message;
        },
      );
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;

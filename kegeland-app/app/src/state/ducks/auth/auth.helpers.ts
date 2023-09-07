import {PayloadAction} from '@reduxjs/toolkit';

import {AuthState, LoginResponse} from './auth.interface';

/**
 * Updates the state after a user is signed in
 * @param state the current state
 * @param action the action returned
 */
export const signInReducer = (
  state: AuthState,
  action: PayloadAction<LoginResponse>,
) => {
  const {id, email} = action.payload;
  state.isSignedIn = true;
  state.authUser = {id, email};
  state.userDetails = action.payload.details;
};

/**
 * Updates the state after a user is signed out
 * @param state the current state
 * @param action the action returned
 */
export const signOutReducer = (state: AuthState) => {
  state.isSignedIn = false;
  state.authUser = undefined;
  state.userDetails = undefined;
};

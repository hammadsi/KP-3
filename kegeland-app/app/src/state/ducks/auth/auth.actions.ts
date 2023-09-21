import {createAsyncThunk} from '@reduxjs/toolkit';

import {Token} from '~constants/auth';
import {apiCaller} from '~utils/apiCaller';
import {removeTokens, retrieveToken, storeTokens} from '~utils/storage';

import {
  LoginDTO,
  LoginResponse,
  RefreshResponse,
  RegisterDTO,
  RegisterResponse,
  ResetPasswordDTO,
} from './auth.interface';

/**
 * Thunk action for signing in a user
 * @param data the request params
 * @see {@link LoginResponse}
 */
export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (data: LoginDTO) =>
    apiCaller<LoginResponse>({url: 'auth/login', method: 'POST', data}).then(
      async (res) => {
        // Store the auth tokens in async storage
        await storeTokens(res.tokens);
        return res;
      },
    ),
);

/**
 * Thunk action for signing out a user
 */
export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
  try {
    const res = await apiCaller<void>({
      url: 'auth/logout',
      method: 'POST',
    });
    return res;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('An unknown error has occurred');
  } finally {
    // Remove the auth tokens from async storage
    await removeTokens();
  }
});

/**
 * Thunk action for signing up a user
 * @param data the request params
 * @see {@link RegisterResponse}
 */
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (data: RegisterDTO) =>
    apiCaller<RegisterResponse>({
      url: 'auth/register',
      method: 'POST',
      data,
    }).then(async (res) => {
      await storeTokens(res.tokens);
      return res;
    }),
);

/**
 * Thunk action for silently refreshing auth tokens
 * @param data the request params
 * @see {@link RefreshResponse}
 */
export const silentRefresh = createAsyncThunk(
  'auth/silentRefresh',
  async () => {
    // Retrieve the refresh token from storage
    const token = await retrieveToken(Token.REFRESH_TOKEN);
    if (!token) {
      // Throw error if refresh token doesn't exist
      throw new Error('No refresh token found');
    }
    await apiCaller<RefreshResponse>({
      url: 'auth/refresh',
      method: 'POST',
      data: {
        refreshToken: token,
      },
    }).then(async (res) => storeTokens(res));
  },
);

/**
 * Thunk action for uploading the answers stored in state to the database
 * @param data the request params
 * @see {@link ResetPasswordDTO}
 */
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordDTO) => {
    apiCaller<void>({url: 'auth/reset', method: 'POST', data});
  },
);

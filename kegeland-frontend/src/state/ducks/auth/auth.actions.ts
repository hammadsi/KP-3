import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller } from '../../../utils/apiCaller';
import {
  removeTokens,
  retrieveToken,
  storeTokens,
} from '../../../utils/storage';

import { Token } from './auth.helpers';
import {
  AuthTokens,
  LoginDTO,
  LoginResponse,
  RegisterDTO,
  RegisterResponse,
  ResetPasswordDTO,
} from './auth.interface';

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (data: LoginDTO) =>
    apiCaller<LoginResponse>({ url: 'auth/login', method: 'POST', data }).then(
      async (res) => {
        await storeTokens(res.tokens);
        return res;
      },
    ),
);

export const refresh = createAsyncThunk('auth/refresh', async () => {
  const token = await retrieveToken(Token.REFRESH_TOKEN);
  if (!token) {
    throw new Error('No refresh token found');
  }
  await apiCaller<AuthTokens>({
    url: 'auth/refresh',
    method: 'POST',
    data: {
      refreshToken: token,
    },
  }).then(async (res) => storeTokens(res));
});

export const signOutUser = createAsyncThunk('auth/signOutUser', async () =>
  apiCaller<void>({ url: 'auth/logout', method: 'POST' }).then(async (res) => {
    await removeTokens();
    return res;
  }),
);

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

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordDTO) => {
    apiCaller<void>({ url: 'auth/reset', method: 'POST', data });
  },
);

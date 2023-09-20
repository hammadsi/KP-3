import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller } from '../../../utils/apiCaller';

import { FetchSessionsDto, Session } from './sessions.interface';

export const fetchSessionById = createAsyncThunk(
  'sessions/fetchSessionById',
  async (id: string) =>
    apiCaller<Session>({
      url: `sessions/${id}`,
      method: 'GET',
    }),
);

export const fetchSessions = createAsyncThunk(
  'sessions/fetchSessions',
  async (params: FetchSessionsDto) =>
    apiCaller<Session[]>({
      url: 'sessions',
      method: 'GET',
      params,
    }),
);

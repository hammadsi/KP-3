import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller } from '../../../utils/apiCaller';

import { FetchSessionDto, FetchSessionsDto, Session } from './sessions.interface';

export const fetchSessionById = createAsyncThunk(
  'sessions/fetchSessionById',
  async (params: FetchSessionDto) => {
    const session = await apiCaller<Session>({
      url: `sessions/${params.patientId}/gameSessions/${params.exerciseId}`,
      method: 'GET',
    });
    return session;
  }
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

import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller } from '../../../utils/apiCaller';

import { FetchSessionDto, FetchSessionsDto, Session } from './sessions.interface';

export const fetchSessionById = createAsyncThunk(
  'sessions/fetchSessionById',
  async (params: FetchSessionDto) => {
    console.log("Here in action, params:", params);
    const session = await apiCaller<Session>({
      url: `${params.patientId}/gameSessions/${params.exerciseId}`,
      method: 'GET',
    });
    console.log("\n\n\n\n\n\nInside action, fetched session:", session);
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

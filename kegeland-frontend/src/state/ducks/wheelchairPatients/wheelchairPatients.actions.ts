import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller } from '../../../utils/apiCaller';

import {
  GameSession,
  GameSessionData,
  UpdateWheelchairPatientData,
  WheelchairPatient,
} from './wheelchairPatients.interface';

export const fetchWheelchairPatientById = createAsyncThunk(
  'wheelchairpatients/fetchWheelchairPatientById',
  async (id: string) =>
    apiCaller<WheelchairPatient>({
      url: `wheelchairPatients/${id}`,
      method: 'GET',
    }),
);

export const updatePatientData = createAsyncThunk(
  'wheelchairpatients/updatePatientData',
  async (updatedData: UpdateWheelchairPatientData) =>
    apiCaller<UpdateWheelchairPatientData>({
      url: `wheelchairPatients/${updatedData.pid}`,
      method: 'PUT',
      data: updatedData.currentPhysicalState,
    }),
);  

export const addEmptyGameSession = createAsyncThunk(
  'wheelchairpatients/addEmptyGameSession',
  async (patientId: string) =>
    apiCaller<GameSession>({
      url: `wheelchairPatients/${patientId}/gameSessions`,
      method: 'POST',
    }),
);

export const updateGameSession = createAsyncThunk(
  'wheelchairpatients/updateGameSession',
  async (payload: { patientId: string; sessionId: string; sessionData: GameSessionData }) =>
  apiCaller<GameSession>({
      url: `wheelchairPatients/${payload.patientId}/gameSessions/${payload.sessionId}`,
      method: 'PUT',
      data: payload.sessionData,
    }),
);

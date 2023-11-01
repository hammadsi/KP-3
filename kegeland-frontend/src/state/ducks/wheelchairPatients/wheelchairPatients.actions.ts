import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller } from '../../../utils/apiCaller';

import {
  GameSession,
  GameSessionData,
  HeartRate,
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
  async (payload: {
    patientId: string;
    id: string;
    sessionData: GameSessionData;
  }) =>
    apiCaller<GameSession>({
      url: `wheelchairPatients/${payload.patientId}/gameSessions/${payload.id}`,
      method: 'PUT',
      data: payload.sessionData,
    }),
);

// For testing purposes
export const addHeartRateToGameSession = createAsyncThunk(
  'wheelchairpatients/addHeartRateToGameSession',
  async (payload: {
    patientId: string;
    sessionId: string;
    heartRateData: HeartRate;
  }) =>
    apiCaller<HeartRate>({ // Replace with your actual response type
      url: `wheelchairPatients/${payload.patientId}/gameSessions/${payload.sessionId}/heartRate`,
      method: 'POST',
      data: payload.heartRateData,
    }),
);

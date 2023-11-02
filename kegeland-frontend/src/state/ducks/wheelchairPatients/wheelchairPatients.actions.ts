import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller } from '../../../utils/apiCaller';

import {
  GameSession,
  GameSessionData,
  HeartRate,
  IMUData,
  Lap,
  Speed,
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

// For manual testing purposes
export const addHeartRateToGameSession = createAsyncThunk(
  'wheelchairpatients/addHeartRateToGameSession',
  async (payload: {
    patientId: string;
    sessionId: string;
    heartRateData: HeartRate;
  }) =>
    apiCaller<HeartRate>({
      // Replace with your actual response type
      url: `wheelchairPatients/${payload.patientId}/gameSessions/${payload.sessionId}/heartRate`,
      method: 'POST',
      data: payload.heartRateData,
    }),
);

// For manual testing purposes
export const addSpeedToGameSession = createAsyncThunk(
  'wheelchairpatients/addSpeedToGameSession',
  async (payload: { patientId: string; sessionId: string; speedData: Speed }) =>
    apiCaller<Speed>({
      // Replace Speed with your actual response type if different
      url: `wheelchairPatients/${payload.patientId}/gameSessions/${payload.sessionId}/speed`,
      method: 'POST',
      data: payload.speedData,
    }),
);

export const addLapToGameSession = createAsyncThunk(
  'wheelchairpatients/addLapToGameSession',
  async (payload: { patientId: string; sessionId: string; lapData: Lap }) =>
    apiCaller<{ sessionId: string; lap: Lap }>({
      // Adjust the response type based on your API
      url: `wheelchairPatients/${payload.patientId}/gameSessions/${payload.sessionId}/lap`,
      method: 'POST',
      data: payload.lapData,
    }),
);

export const addIMUDataToGameSession = createAsyncThunk(
  'wheelchairpatients/addIMUDataToGameSession',
  async (payload: {
    patientId: string;
    sessionId: string;
    imuData: IMUData[];
  }) =>
    apiCaller<IMUData[]>({
      url: `wheelchairPatients/${payload.patientId}/gameSessions/${payload.sessionId}/imuData`,
      method: 'POST',
      data: payload.imuData,
    }),
);
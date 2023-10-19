import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller } from '../../../utils/apiCaller';

import {
  GameSession,
  NewGameSession,
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

export const addGameSessionToPatient = createAsyncThunk(
  'wheelchairpatients/addGameSessionToPatient',
  async (payload: { patientId: string, gameSession: NewGameSession }) =>
    apiCaller<GameSession>({
      url: `wheelchairPatients/${payload.patientId}/gameSessions`,
      method: 'POST',
      data: payload.gameSession,
    }),
);

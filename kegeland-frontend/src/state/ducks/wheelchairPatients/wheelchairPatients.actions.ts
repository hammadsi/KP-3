import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCaller } from '../../../utils/apiCaller';
import { WheelchairPatient } from './wheelchairPatients.interface';

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
  async (wheelchairPatient: WheelchairPatient) =>
    apiCaller<WheelchairPatient['currentPhysicalState']>({
      url: `wheelchairPatients/${wheelchairPatient.id}`,
      method: 'POST',
      data: wheelchairPatient.currentPhysicalState,
    }),
);
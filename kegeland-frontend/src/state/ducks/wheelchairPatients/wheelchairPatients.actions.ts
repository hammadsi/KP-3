import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCaller } from '../../../utils/apiCaller';
import { WheelchairPatient } from './wheelchairPatients.interface';

export const fetchWheelchairPatientById = createAsyncThunk(
  'patients/fetchWheelchairPatientById',
  async (id: string) =>
    apiCaller<WheelchairPatient>({
      url: `wheelchair-patients/${id}`,
      method: 'GET',
    }),
);

export const updatePatientData = createAsyncThunk(
  'patients/updatePatientData',
  async (wheelchairPatient: WheelchairPatient) =>
    apiCaller<WheelchairPatient['currentPhysicalState']>({
      url: `wheelchairPatients/${wheelchairPatient.patientId}`,
      method: 'POST',
      data: wheelchairPatient.currentPhysicalState,
    }),
);

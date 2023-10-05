import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCaller } from '../../../utils/apiCaller';
import { WheelchairPatient } from './wheelchairPatients.interface';

export const fetchWheelchairPatientById = createAsyncThunk(
  'patients/fetchWheelchairPatientById',
  async (id: string) =>
    apiCaller<WheelchairPatient>({
      url: `users/wheelchair-patients/${id}`,
      method: 'GET',
    }),
);

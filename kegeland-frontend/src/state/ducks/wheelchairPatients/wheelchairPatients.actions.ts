import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCaller } from '../../../utils/apiCaller';
import {
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

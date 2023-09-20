import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller } from '../../../utils/apiCaller';

import { Sensor, SensorType } from './sensors.interface';

export const fetchSensor = createAsyncThunk(
  'sensors/fetchSensor',
  async (sensorType: SensorType) =>
    apiCaller<Sensor>({
      url: `sensors/${sensorType}`,
      method: 'GET',
    }),
);

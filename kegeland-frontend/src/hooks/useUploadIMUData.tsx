import { useState } from 'react';

import { addIMUDataToGameSession } from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';
import { IMUData } from '../state/ducks/wheelchairPatients/wheelchairPatients.interface';

import useAppDispatch from './useAppDispatch';

const useUploadIMUData = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadIMUData = async (
    patientId: string,
    sessionId: string,
    imuData: IMUData[],
  ) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(
        addIMUDataToGameSession({
          patientId,
          sessionId,
          imuData,
        }),
      );
    } catch (e: any) {
      setError(`Failed to upload IMU data: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { uploadIMUData, loading, error };
};

export default useUploadIMUData;

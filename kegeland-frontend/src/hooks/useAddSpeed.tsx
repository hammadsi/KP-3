import { useState } from 'react';

import { addSpeedToGameSession } from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';
import useAppDispatch from './useAppDispatch';

const useAddSpeed = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addSpeed = async (
    patientId: string,
    sessionId: string,
    leftSpeed: number,
    rightSpeed: number,
    timestamp: Date
  ) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(
        addSpeedToGameSession({
          patientId,
          sessionId,
          speedData: { leftSpeed, rightSpeed, timestamp }
        })
      );
    } catch (e: any) {
      setError(`Failed to add speed data: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { addSpeed, loading, error };
};

export default useAddSpeed;

import { useState } from 'react';

import { addHeartRateToGameSession } from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';

import useAppDispatch from './useAppDispatch';

// This hook is for testing if the API call works. The actual call will be made from the Unity game.
const useAddHeartRate = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addHeartRate = async (
    patientId: string,
    sessionId: string,
    heartRate: number,
    timestamp: Date
  ) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(
        addHeartRateToGameSession({
          patientId,
          sessionId,
          heartRateData: { heartRate, timestamp }
        })
      );
    } catch (e: any) {
      setError(`Failed to add heart rate: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { addHeartRate, loading, error };
};

export default useAddHeartRate;

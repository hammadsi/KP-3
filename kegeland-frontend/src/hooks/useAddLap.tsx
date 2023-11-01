import { useState } from 'react';
import { addLapToGameSession } from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';
import useAppDispatch from './useAppDispatch';


const useAddLap = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addLap = async (
    patientId: string,
    sessionId: string,
    lapTime: number,
    timestamp: Date
  ) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(
        addLapToGameSession({
          patientId,
          sessionId,
          lapData: { lapTime, timestamp },
        })
      ).unwrap();  // Using unwrap to handle the returned promise correctly.
    } catch (e: any) {
      setError(`Failed to add lap data: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { addLap, loading, error };
};

export default useAddLap;

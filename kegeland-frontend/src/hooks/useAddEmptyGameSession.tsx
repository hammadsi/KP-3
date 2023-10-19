import { useState } from 'react';
import { addEmptyGameSession } from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';
import useAppDispatch from './useAppDispatch';

const useAddEmptyGameSession = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addSession = async (patientId: string) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(addEmptyGameSession(patientId));
    } catch (e: any) {
      setError(`Failed to add empty game session: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { addGameSession: addSession, loading, error };
};

export default useAddEmptyGameSession;

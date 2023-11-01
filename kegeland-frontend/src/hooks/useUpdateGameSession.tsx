import { useState } from 'react';

import { updateGameSession } from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';
import { UpdateGameSessionData } from '../state/ducks/wheelchairPatients/wheelchairPatients.interface';

import useAppDispatch from './useAppDispatch';

const useUpdateGameSession = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateSession = async (sessionData: UpdateGameSessionData) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(updateGameSession(sessionData));
    } catch (e: any) {
      setError(`Failed to update game session: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { updateSession, loading, error };
};

export default useUpdateGameSession;

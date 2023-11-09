import { useState } from 'react';

import { updatePostGameQuestionnaire } from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';
import { Question } from '../state/ducks/wheelchairPatients/wheelchairPatients.interface';

import useAppDispatch from './useAppDispatch';

const useUpdatePostGameQuestionnaire = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateQuestionnaire = async (
    patientId: string,
    sessionId: string,
    questionnaire: Question[],
  ) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(
        updatePostGameQuestionnaire({
          patientId,
          sessionId,
          questionnaire,
        }),
      ).unwrap();
    } catch (e: any) {
      setError(`Failed to update post-game questionnaire: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { updateQuestionnaire, loading, error };
};

export default useUpdatePostGameQuestionnaire;

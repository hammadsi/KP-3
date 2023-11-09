import { useState, useCallback } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

import { updatePatientData } from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';
import { CurrentPhysicalState } from '../state/ducks/wheelchairPatients/wheelchairPatients.interface';

import useAppDispatch from './useAppDispatch';

const useUpdatePhysicalState = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePhysicalState = useCallback(
    async (patientId: string, physicalStateData: CurrentPhysicalState) => {
      setLoading(true);
      setError(null);
      try {
        const resultAction = await dispatch(
          updatePatientData({
            pid: patientId,
            currentPhysicalState: physicalStateData,
          }),
        );
        unwrapResult(resultAction); // If the promise rejects, this will throw
      } catch (error: any) {
        // if using TypeScript, you can specify `unknown` instead of `any`
        // If the error is an object and has a message property, we display it
        setError(error.message ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  return { updatePhysicalState, loading, error };
};

export default useUpdatePhysicalState;

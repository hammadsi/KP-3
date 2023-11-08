import { useEffect } from 'react';

import { fetchPatientById } from '../state/ducks/patients/patients.actions';
import { clearPatientsState } from '../state/ducks/patients/patients.reducer';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useUserDetails = (patientId?: string) => {
  const dispatch = useAppDispatch();
  const { loading, error, patient } = useAppSelector((state) => state.patients);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchPatientById(patientId)).catch((e: Error) => {
        console.error(`Failed to fetch patient: ${e.message}`);
      });
    }

    // Cleanup function to reset the patient state
    return () => {
      dispatch(clearPatientsState());
    };
  }, [dispatch, patientId]);

  return {
    patient,
    error,
    loading,
  };
};

export default useUserDetails;

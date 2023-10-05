import { useEffect, useState } from 'react';
import { fetchWheelchairPatientById } from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';
import { clearWheelchairPatientsState } from '../state/ducks/wheelchairPatients/wheelchairPatients.reducer';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useWheelchairPatient = (patientId: string) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true); 
  const { wheelchairPatients } = useAppSelector((state) => state);
  
  useEffect(() => {
    dispatch(fetchWheelchairPatientById(patientId));

    // Cleanup function to reset state on component unmount
    return () => {
      dispatch(clearWheelchairPatientsState());
    };
  }, [dispatch, patientId]);

  useEffect(() => {
    // Ensure local loading state is only false when the data corresponds to the requested ID
    if (loading && !wheelchairPatients.loading && wheelchairPatients.wheelchairPatient?.patientId === patientId) {
      setLoading(false);
    } else if (!loading && (wheelchairPatients.loading || wheelchairPatients.wheelchairPatient?.patientId !== patientId)) {
      setLoading(true);
    }
  }, [wheelchairPatients.loading, wheelchairPatients.wheelchairPatient]);

  return {
    wheelchairPatient: wheelchairPatients.wheelchairPatient,
    error: wheelchairPatients.error,
    loading,
  };
};

export default useWheelchairPatient;

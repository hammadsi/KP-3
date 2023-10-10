import { useEffect, useState } from 'react';

import {
  fetchWheelchairPatientById,
  updatePatientData,
} from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';
import { clearWheelchairPatientsState } from '../state/ducks/wheelchairPatients/wheelchairPatients.reducer';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { UpdateWheelchairPatientData, WheelchairPatient } from '../state/ducks/wheelchairPatients/wheelchairPatients.interface';

const useWheelchairPatient = (patientId?: string) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { wheelchairPatients } = useAppSelector((state) => state);

  useEffect(() => {
    // Reset error state upon new request
    setError(null);

    // Only fetch new patient data if the ID changes, or if the data isn't present in the state
    if (
      patientId &&
      (!wheelchairPatients.wheelchairPatient ||
        wheelchairPatients.wheelchairPatient.id !== patientId)
    ) {
      dispatch(fetchWheelchairPatientById(patientId)).catch((e: Error) => {
        setError(`Failed to fetch patient: ${e.message}`);
      });
    }
  }, [dispatch, patientId, wheelchairPatients.wheelchairPatient]);

  // Handle patient data update
  const updatePatientDataById = async (
    updatedData: UpdateWheelchairPatientData
  ) => {
    // Dispatch the update action
    dispatch(updatePatientData(updatedData));

    // Refetch the patient data to ensure it's updated in the state
    dispatch(fetchWheelchairPatientById(updatedData.pid)).catch(
      (e: Error) => {
        setError(`Failed to update patient data: ${e.message}`);
      }
    );
  };

  // NOTE: without a dedicated useEffect for clean-up, an infinite loop of API-calls will be triggered
  useEffect(() => {
    // Cleanup on unmount only
    return () => {
      dispatch(clearWheelchairPatientsState());
    };
  }, [dispatch]);

  useEffect(() => {
    // Ensure local loading state is only false when the data corresponds to the requested ID
    if (
      loading &&
      !wheelchairPatients.loading &&
      wheelchairPatients.wheelchairPatient?.id === patientId
    ) {
      setLoading(false);
    } else if (
      !loading &&
      (wheelchairPatients.loading ||
        wheelchairPatients.wheelchairPatient?.id !== patientId)
    ) {
      setLoading(true);
    }
  }, [
    loading,
    wheelchairPatients.loading,
    wheelchairPatients.wheelchairPatient,
  ]);

  return {
    wheelchairPatient: wheelchairPatients.wheelchairPatient,
    error: error || wheelchairPatients.error,
    loading,
    updatePatientData: updatePatientDataById, // Include the update function in the returned object
  };
};

export default useWheelchairPatient;

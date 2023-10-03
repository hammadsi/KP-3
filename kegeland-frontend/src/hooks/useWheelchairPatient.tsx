import { useEffect } from 'react';
import { fetchWheelchairPatientById } from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useWheelchairPatientById = (id: string) => {
  const dispatch = useAppDispatch();

  const { wheelchairPatient, loading, error } = useAppSelector(
    (state) => state.wheelchairPatients
  );

  useEffect(() => {
    dispatch(fetchWheelchairPatientById(id));
  }, [dispatch, id]);

  return { wheelchairPatient, loading, error };
};

export default useWheelchairPatientById;

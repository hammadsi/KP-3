import { useEffect, useState } from 'react';

import { fetchWheelchairPatientById } from '../state/ducks/wheelchairPatients/wheelchairPatients.actions';
import { clearWheelchairPatientsState } from '../state/ducks/wheelchairPatients/wheelchairPatients.reducer';
import { UserRole } from '../state/ducks/auth/auth.interface';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { authUser, userDetails, isSignedIn } = useAppSelector(
    (state) => state.auth,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchWheelchairPatient = async () => {
      if (isSignedIn && userDetails?.roles.includes(UserRole.PATIENT)) {
        await dispatch(fetchWheelchairPatientById(authUser?.id!));
      }
    };

    fetchWheelchairPatient();

    return () => {
      dispatch(clearWheelchairPatientsState());
    };
  }, [dispatch, authUser, isSignedIn, userDetails]);

  useEffect(() => {
    if (authUser && userDetails) {
      setReady(true);
    }
  }, [authUser, userDetails]);

  return { ready, isSignedIn, authUser, userDetails };
};

export default useAuth;

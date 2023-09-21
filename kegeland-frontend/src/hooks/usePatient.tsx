import { useEffect } from 'react';

import { fetchSessions } from '../state/ducks/sessions/sessions.actions';
import { clearSessionsState } from '../state/ducks/sessions/sessions.reducer';
import {
  getLastSessionTimeDelta,
  getNumSessionsThisWeek,
} from '../utils/session.utils';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const usePatient = (patientId: string) => {
  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.sessions);

  useEffect(() => {
    dispatch(fetchSessions({ userId: patientId }));

    return () => {
      dispatch(clearSessionsState());
    };
  }, []);

  return {
    data,
    loading,
    details: {
      sessionsThisWeek: getNumSessionsThisWeek(data),
      lastSessionDelta: getLastSessionTimeDelta(data),
      sessionsTotal: data.length,
    },
  };
};

export default usePatient;

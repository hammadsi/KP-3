import { useEffect, useState } from 'react';

import { refresh } from '../state/ducks/auth/auth.actions';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

export const REFRESH_INTERVAL_MS = 50 * 60 * 1000;
const useSilentRefresh = () => {
  const dispatch = useAppDispatch();
  const { isSignedIn } = useAppSelector((state) => state.auth);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      dispatch(refresh());
    }
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      const interval = setInterval(() => {
        dispatch(refresh());
      }, REFRESH_INTERVAL_MS);
      setTimer(interval);
    } else {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    }
    return () => {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    };
  }, [isSignedIn]);

  return true;
};

export default useSilentRefresh;

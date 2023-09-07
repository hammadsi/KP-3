import {useEffect, useState} from 'react';

import {REFRESH_INTERVAL_MS} from '~constants/auth';
import {silentRefresh} from '~state/ducks/auth/auth.actions';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

/**
 * Hook for silently refreshing auth-tokens for an authorized user.
 * Will refresh in a given time interval. If the refresh fails, the
 * user will be signed out.
 */
const useSilentRefresh = () => {
  const dispatch = useAppDispatch();
  const {isSignedIn} = useAppSelector((state) => state.auth);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  useEffect(() => {
    if (isSignedIn) {
      dispatch(silentRefresh());
    }
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      // Start the refresh interval
      const interval = setInterval(() => {
        dispatch(silentRefresh());
      }, REFRESH_INTERVAL_MS);
      setTimer(interval);
    } else {
      if (timer) {
        // Clear interval if the user is not signed in and the interval is initialied
        clearInterval(timer);
        setTimer(null);
      }
    }
    return () => {
      if (timer) {
        // Clear the interval on unmount
        clearInterval(timer);
        setTimer(null);
      }
    };
  }, [isSignedIn]);

  return true;
};

export default useSilentRefresh;

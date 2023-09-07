import { LeanSession } from '../state/ducks/sessions/sessions.interface';

import useAppSelector from './useAppSelector';

/**
 * Custom hook for selecting a specific sensor from the redux store
 */
const useSessionSensorSelector = (session: LeanSession | undefined) => {
  return useAppSelector((state) =>
    session ? state.sensors.data[session.sensor] : undefined,
  );
};

export default useSessionSensorSelector;

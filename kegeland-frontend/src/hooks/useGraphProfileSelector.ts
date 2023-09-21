import { find } from 'lodash';

import { SensorType } from '../state/ducks/sensors/sensors.interface';

import useAppSelector from './useAppSelector';

/**
 * Custom hook for selecting a specific graph profile from the redux store
 */
const useGraphProfileSelector = (sensor: SensorType) =>
  useAppSelector((state) =>
    find(state.settings.graph, (_val, key) => key === sensor),
  );

export default useGraphProfileSelector;

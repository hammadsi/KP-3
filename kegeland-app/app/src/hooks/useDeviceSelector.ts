import {find} from 'lodash';

import {DeviceType} from '~constants/bluetooth';

import useAppSelector from './useAppSelector';

/**
 * Custom hook for selecting a specific device from the redux store
 */
const useDeviceSelector = (deviceType: DeviceType) =>
  useAppSelector((state) =>
    find(state.bluetooth.connectedDevices, (d) => d.type === deviceType),
  );

export default useDeviceSelector;

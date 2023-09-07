import {BluetoothService} from '~constants/bluetooth/interface';
import {transformId} from '~utils/platform.utils';

export const PRESSURE_SENSOR_MIN_VAL = 760;
export const PRESSURE_SENSOR_MAX_VAL = 970;
export const ACTIVATION_THRESHOLD = 0.15;

/**
 * Transform UUIDs based on the current platform
 */
const HOUSEKEEPING_SERVICE_UUID = transformId(
  'b92a0001-4bf9-4870-8aa1-881b3a20ada4',
);
const HOUSEKEEPING_CHARACTERISTIC_UUID = transformId(
  'b92a0002-4bf9-4870-8aa1-881b3a20ada4',
);
const SENSOR_SERVICE_UUID = transformId('0d9e0001-c111-49cd-bba3-85c7471cb6fa');
const SENSOR_1_UUID = transformId('0d9e0002-c111-49cd-bba3-85c7471cb6fa');
const SENSOR_2_UUID = transformId('0d9e0003-c111-49cd-bba3-85c7471cb6fa');
const SENSOR_3_UUID = transformId('0d9e0004-c111-49cd-bba3-85c7471cb6fa');
const SENSOR_4_UUID = transformId('0d9e0005-c111-49cd-bba3-85c7471cb6fa');

/**
 * The femfit services
 */
export const SERVICES = {
  HOUSEKEEPING_SERVICE: HOUSEKEEPING_SERVICE_UUID,
  SENSOR_SERVICE: SENSOR_SERVICE_UUID,
};

/**
 * The housekeeping service for femfit
 */
export const HOUSEKEEPING_SERVICE: BluetoothService = {
  uuid: HOUSEKEEPING_SERVICE_UUID,
  characteristics: [HOUSEKEEPING_CHARACTERISTIC_UUID],
};

/**
 * The sensor service for femfit
 */
export const SENSOR_SERVICE: BluetoothService = {
  uuid: SENSOR_SERVICE_UUID,
  characteristics: [SENSOR_1_UUID, SENSOR_2_UUID, SENSOR_3_UUID, SENSOR_4_UUID],
};

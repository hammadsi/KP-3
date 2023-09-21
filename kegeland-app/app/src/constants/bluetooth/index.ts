import FEMFIT_PROFILE from '~lib/femfit/bluetooth/profile';

import {BluetoothProfile} from './interface';

/**
 * How long to scan for bluetooth peripherals, in seconds.
 */
export const SCAN_TIME = 5;
/**
 * Whether or not to allows duplicate devices
 */
export const ALLOW_DUPLICATE_DEVICES = false;
/**
 * How often to read BLE characteristic notifications
 */
export const UPDATE_INTERVAL_MS = 250;

export const _profiles = {
  femfit: FEMFIT_PROFILE,
} as const;

export type DeviceType = keyof typeof _profiles;

/**
 * Record of supported bluetooth profiles
 */
export const BLE_PROFILES = _profiles as Record<DeviceType, BluetoothProfile>;

/**
 * Record of supported peripherals
 */
export const PERIPHERAL_MAP: Record<string, DeviceType> = {
  [FEMFIT_PROFILE.batteryService.service.uuid]: 'femfit',
};

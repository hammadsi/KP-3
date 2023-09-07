import {clamp, mean, round} from 'lodash';

import {PRESSURE_SENSOR_MAX_VAL, PRESSURE_SENSOR_MIN_VAL} from './constants';

const range = PRESSURE_SENSOR_MAX_VAL - PRESSURE_SENSOR_MIN_VAL;

/**
 * Calculates the pressure increase relative to minimum value
 * @param value pressure data
 * @returns pressure percent
 */
export const pressurePercent = (value: number) =>
  (value - PRESSURE_SENSOR_MIN_VAL) / range;

/**
 * Converts byte data to a battery level
 * @param bytes byte data
 * @returns
 */
export const readBattery = (bytes: number[]) => {
  const voltage =
    // eslint-disable-next-line no-bitwise
    (((((bytes[4] & 255) << 8) | (bytes[5] & 255)) * 1.2) / 1024 / 220000) *
    1220000;

  return clamp(round(voltage / 6.1, 2), 0, 1);
};

/**
 * Converts bytes to a pressure level
 * @param byte1 first byte
 * @param byte2 second byte
 * @returns pressure level
 */
const convertPressure = (byte1: number, byte2: number) => {
  return clamp(
    // eslint-disable-next-line no-bitwise
    ((((byte1 & 255) << 8) | (byte2 & 255)) + 65536) * 0.00750063755,
    PRESSURE_SENSOR_MIN_VAL,
    PRESSURE_SENSOR_MAX_VAL,
  );
};

/**
 * Converts byte to temperature
 * @param byte temperature byte
 * @returns temperature
 */
const convertSensorTemperature = (byte: number) => {
  return byte * 0.16 + 10.0;
};

/**
 * Converts byte data from the femfit sensor to pressures and temperatures for each of the 8 sensors
 * @param data byte data
 * @returns list of pressures and list of temperatures
 */
export const readSensorBytes = (data: number[][]) => {
  const pressures: number[] = [];
  const temps: number[] = [];
  for (const bytes of data) {
    pressures.push(
      ...[
        round(
          mean([
            convertPressure(bytes[2], bytes[3]),
            convertPressure(bytes[5], bytes[6]),
            convertPressure(bytes[8], bytes[9]),
          ]),
          2,
        ),
        round(
          mean([
            convertPressure(bytes[11], bytes[12]),
            convertPressure(bytes[14], bytes[15]),
            convertPressure(bytes[17], bytes[18]),
          ]),
          2,
        ),
      ],
    );
    temps.push(
      ...[
        round(
          mean([
            convertSensorTemperature(bytes[4]),
            convertSensorTemperature(bytes[7]),
            convertSensorTemperature(bytes[10]),
          ]),
          2,
        ),
        round(
          mean([
            convertSensorTemperature(bytes[13]),
            convertSensorTemperature(bytes[16]),
            convertSensorTemperature(bytes[19]),
          ]),
          2,
        ),
      ],
    );
  }
  return {pressures, temperatures: temps};
};

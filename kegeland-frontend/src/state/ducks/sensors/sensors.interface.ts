export enum SensorType {
  FEMFIT = 'femfit',
  EMPATICA = 'empatica',
  IMU = 'imu',
}

export type Sensor = {
  id: string;
  name: SensorType;
  labels: string[];
};

export interface SensorState {
  loading: boolean;
  data: {
    [key in SensorType]?: Sensor;
  };
  error: string | undefined;
}

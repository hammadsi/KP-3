import { SensorType } from '../sensors/sensors.interface';

export type GraphLabels = {
  [key: string]: { plotType: 'bar' | 'line' | 'scatter'; hidden: boolean };
};

export type GraphProfile = {
  useTimedelta: boolean;
  labels: GraphLabels;
};

export type SettingsState = {
  graph: {
    [key in SensorType]: GraphProfile | undefined;
  };
};

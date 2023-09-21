import { Sensor, SensorState, SensorType } from '../sensors.interface';

export const sensorFemfitRespose: Sensor = {
  id: 'femfit',
  labels: [
    'p1',
    'p2',
    'p3',
    'p4',
    'p5',
    'p6',
    't1',
    't2',
    't3',
    't4',
    't5',
    't6',
  ],
  name: SensorType.FEMFIT,
};

export const sensorsFemfitEmpaticaResponce: SensorState = {
  loading: false,
  error: undefined,
  data: {
    femfit: {
      id: 'femfit',
      labels: [
        'p1',
        'p2',
        'p3',
        'p4',
        'p5',
        'p6',
        't1',
        't2',
        't3',
        't4',
        't5',
        't6',
      ],
      name: SensorType.FEMFIT,
    },
    empatica: {
      id: 'empatica',
      labels: [
        'HR (bpm)',
        'Speed (km/h)',
        'Pace (min/km)',
        'Cadence',
        'Altitude (m)',
        'Stride length (m)',
        'Distances (m)',
        'Temperatures (C)',
        'Power (W)',
      ],
      name: SensorType.EMPATICA,
    },
  },
};

export type WheelchairPatient = {
  id: string;
  name: string;
  birthdate: string;
  gender: 'M' | 'F' | 'O';
  currentPhysicalState: CurrentPhysicalState;
  gameSessions: GameSession[];
};

export type CurrentPhysicalState = {
  height: number;
  weight: number;
  maxHeartRate: number;
  averageHeartRate: number;
  maxWheelchairSpeed: number;
  averageWheelchairSpeed: number;
  questionnaire: Question[];
};

export type GameSession = {
  createdAt: number;
  id: string;
  startTime: Date;
  endTime: Date;
  exerciseTime: number;
  questionnaires: {
    postGame: Question[];
  };
  laps: Lap[];
  timeSeriesData: TimeSeriesData;
  IMUData: IMUData[];
};

export type Question = {
  question: string;
  answer: string;
  category: string;
  chronology: number;
};

export type Lap = {
  lapTime: number;
  timestamp: Date;
};

export type IMUData = {
  timestamp: number;
  accelerometer: {
    x: number;
    y: number;
    z: number;
  };
  gyroscope: {
    x: number;
    y: number;
    z: number;
  };
};

export type TimeSeriesData = {
  heartRates: HeartRate[];
  speeds: Speed[];
};

export type HeartRate = {
  heartRate: number;
  timestamp: Date;
};

export type Speed = {
  leftSpeed: number;
  rightSpeed: number;
  timestamp: Date;
};

export type WheelchairPatientsState = {
  loading: boolean;
  wheelchairPatient: WheelchairPatient | undefined;
  data: WheelchairPatient[];
  error: string | undefined;
};

export type UpdateWheelchairPatientData = {
  pid: WheelchairPatient['id'];
  currentPhysicalState: CurrentPhysicalState;
};

export type UpdateGameSessionData = {
  patientId: string;
  id: string;
  sessionData: GameSessionData;
};

export type GameSessionData = {
  createdAt: number;
  startTime: Date;
  endTime: Date;
  exerciseTime: number;
  questionnaires: {
    postGame: Question[];
  };
  laps: Lap[];
  timeSeriesData: TimeSeriesData;
  IMUData: IMUData[];
};
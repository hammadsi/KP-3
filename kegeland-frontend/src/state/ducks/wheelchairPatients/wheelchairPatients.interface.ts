export type WheelchairPatient = {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  currentPhysicalState: {
    height: number;
    weight: number;
    maxHeartRate: number;
    averageHeartRate: number;
    maxWheelchairSpeed: number;
    averageWheelchairSpeed: number;
  };
  gameSessions: GameSession[];
};

export type GameSession = {
  sessionId: string;
  exerciseTime: number; // Calculated from startTime and endTime
  startTime: Date;
  endTime: Date;
  questionaires: {
    preGame: Questionaire[];
    postGame: Questionaire[];
  };
  laps: Lap[];
  timeSeriesData: TimeSeriesData;
};

export type Questionaire = {
  question: string;
  answer: string;
};

export type Lap = {
  lapTime: number;
  timestamp: Date;
};

export type TimeSeriesData = {
  heartRates: HeartRate[];
  speeds: Speed[];
  imus: IMUData[]; // Define the IMUData type based on actual data structure
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

export type IMUData = {
  // Define properties based on your requirements and data structure
};

export type WheelchairPatientsState = {
  loading: boolean;
  wheelchairPatient: WheelchairPatient | undefined;
  data: WheelchairPatient[];
  error: string | undefined;
};

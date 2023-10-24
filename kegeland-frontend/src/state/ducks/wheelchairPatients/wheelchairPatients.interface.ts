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
};

export type GameSession = {
  sessionId: string;
  startTime: Date;
  endTime: Date;
  exerciseTime: number;
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

export type UpdateWheelchairPatientData = {
  pid: WheelchairPatient['id'];
  currentPhysicalState: CurrentPhysicalState;
};

export type UpdateGameSessionData = {
  patientId: string;
  sessionId: string;
  sessionData: GameSessionData;
};

export type GameSessionData = {
  startTime: Date;
  endTime: Date;
  exerciseTime: number;
  questionaires: {
    preGame: Questionaire[];
    postGame: Questionaire[];
  };
  laps: Lap[];
  timeSeriesData: TimeSeriesData;
};

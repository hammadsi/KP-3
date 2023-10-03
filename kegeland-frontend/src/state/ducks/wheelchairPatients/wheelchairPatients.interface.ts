export type WheelchairPatients = {
  patients: WheelchairPatient[];
};

export type WheelchairPatient = {
  patientId: String;
  name: String;
  age: Number;
  gender: 'M' | 'F' | 'O';
  currentPhysicalState: {
    height: Number;
    weight: Number;
    maxHeartRate: Number;
    averageHeartRate: Number;
    maxWheelchairSpeed: Number;
    averageWheelchairSpeed: Number;
  };
  gameSessions:{
      sessionId: String;
      //exerciseTime should be calcuated from startTime and endTime
      exerciseTime: Number;
      startTime: Date;
      endTime: Date;
      questionaires: {
        preGame:
          {
            question: String;
            answer: String;
          }[];
        postGame: {
            question: String;
            answer: String;
          }[];
      };
      laps: {
          lapTime: Number;
          timeStamp: Date;
        }[];
      timeSeriesData:{
          heartRates: {
              heartRate: Number;
              timestamp: Date;
            }[];
          speeds: {
              leftSpeed: Number;
              rightSpeed: Number;
              timestamp: Date;
            }[];
          imus: {}[];
        };
    }[];
};

export type WheelchairPatientsState = {
  loading: boolean;
  wheelchairPatients: WheelchairPatients | null;
  wheelchairPatient: WheelchairPatient | null;
  error: string | null;
};

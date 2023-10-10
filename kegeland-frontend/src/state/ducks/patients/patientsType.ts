type PatientsType = {
  patients: [
    {
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
      gameSessions: [
        {
          sessionId: String;
          // exerciseTime should be calcuated from startTime and endTime
          exerciseTime: Number;
          startTime: Date;
          endTime: Date;
          performanceMetrics: {
            // ...
          };
          questionaires: {
            preGame: [
              {
                question: String;
                answer: String;
              },
            ];
            postGame: [
              {
                question: String;
                answer: String;
              },
            ];
          };
          laps: [
            {
              lapTime: Number;
              timeStamp: Date;
            },
          ];
          timeSeriesData: [
            {
              heartRates: [
                {
                  heartRate: Number;
                  timestamp: Date;
                },
              ];
              speeds: [
                {
                  leftSpeed: Number;
                  rightSpeed: Number;
                  timestamp: Date;
                },
              ];
              imus: [
                {
                  // ...
                },
              ];
            },
          ];
        },
      ];
    },
  ];
};

export {};

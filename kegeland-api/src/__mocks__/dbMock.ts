import { timestamp } from 'src/utils/timestamp';
export const dbMock = {
  patients: [
    {
      id: 'p1',
      name: 'John Doe',
      birthdate: '2000-09-28T12:00:00',
      gender: 'M',
      currentPhysicalState: {
        height: 180,
        weight: 75,
        maxHeartRate: 180,
        averageHeartRate: 80,
        maxWheelchairSpeed: 10,
        averageWheelchairSpeed: 5,
      },
      gameSessions: [
        {
          id: 's1',
          exerciseTime: 60,
          startTime: timestamp(),
          endTime: timestamp(),
          questionaires: {
            preGame: [
              {
                question: 'How do you feel?',
                answer: 'Good',
              },
            ],
            postGame: [
              {
                question: 'How do you feel now?',
                answer: 'Tired',
              },
            ],
          },
          laps: [
            {
              lapTime: 15,
              timeStamp: timestamp(),
            },
          ],
          timeSeriesData: {
            heartRates: [
              {
                heartRate: 80,
                timestamp: timestamp(),
              },
            ],
            speeds: [
              {
                leftSpeed: 5,
                rightSpeed: 5,
                timestamp: timestamp(),
              },
            ],
            imus: [],
          },
        },
      ],
    },
  ],
  userDetails: [
    {
      id: '_id',
      roles: ['patient'],
      patientType: ['wheelchair'],
      email: 'arne.bente@ntnu.no',
      name: {
        lastName: 'Arnhildsson',
        firstName: 'Arne-Bente',
      },
    },
  ],
  sessions: [
    {
      userId: '_id',
      createdAt: 1667810961876,
      data: {
        1234: [1, 2, 3, 4, 5],
        2345: [1, 3, 4, 5, 6],
      },
      sensor: 'femfit',
      id: '_id',
    },
  ],
  sensors: [
    {
      labels: ['HR', 'Speed', 'Altitude'],
      name: 'empatica',
    },
  ],
  questionnaires: [
    {
      name: 'Registration',
      questionList: [
        {
          key: 'Q1',
          maxVal: 'Always',
          minVal: 'Never',
          text: 'It is very hard for me to concentrate on a difficult task when there are noises around',
        },
      ],
    },
  ],
  questions: [
    {
      sensor: 'femfit',
      name: 'Test quest',
      questions: [{ maxVal: 'Very', minVal: 'Not', question: 'How?' }],
    },
  ],
  answers: [
    {
      userId: '_id',
      answeredAt: timestamp(),
      answers: [1, 2, 3],
      id: '_id',
    },
  ],
};

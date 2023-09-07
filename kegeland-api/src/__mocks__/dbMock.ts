import { timestamp } from 'src/utils/timestamp';
export const dbMock = {
  userDetails: [
    {
      id: '_id',
      roles: ['patient'],
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
      sessionId: '_id',
    },
  ],
};

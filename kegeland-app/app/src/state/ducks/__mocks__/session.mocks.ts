import {ExerciseSession} from '../session/session.interface';

export const rawSessionMock: ExerciseSession = {
  data: {
    132413113: [131, 123, 123, 123, 132],
    123214123: [123, 123, 123, 123, 634],
  },
  sensor: 'femfit',
};

export const sessionMock: ExerciseSession = {
  id: 'asfadas83',
  ...rawSessionMock,
};

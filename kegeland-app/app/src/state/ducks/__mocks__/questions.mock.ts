import {Answer, Questionnaire} from '../questions/questions.interface';

export const questionnaireMock: Questionnaire = {
  id: '31wwddaok',
  name: 'Test questionnaire',
  sensor: 'femfit',
  questions: [
    {maxVal: 'Very good', minVal: 'Very bad', question: 'How do you feel?'},
  ],
};

export const answerBefore: Answer = {
  answeredAt: Date.now(),
  answers: [3],
  userId: '31qd',
};
export const answerAfter: Answer = {
  answeredAt: Date.now(),
  answers: [6],
  userId: '31qd',
};

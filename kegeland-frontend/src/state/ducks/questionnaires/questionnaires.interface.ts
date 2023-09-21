import { SensorType } from '../sensors/sensors.interface';

export type Questionnaire = {
  id: string;
  name: string;
  sensor: SensorType;
  questions: {
    maxVal: string;
    minVal: string;
    question: string;
  }[];
};

export type Answer = {
  userId: string;
  sessionId: string;
  createdAt: number;
  answers: number[];
};

export interface QuestionnaireState {
  loading: boolean;
  error: string | undefined;
  data: Questionnaire[];
  questionnaire: Questionnaire | undefined;
  answers: Answer[];
}

export type FetchAssignedQuestionnaireDTO = {
  userId: string;
  sensor: SensorType;
};

export type FetchQuestionnaireAnswersDTO = {
  questionnaireId: string;
  sessionId: string;
};

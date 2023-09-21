import {DeviceType} from '~constants/bluetooth';

export type Questionnaire = {
  id: string;
  name: string;
  sensor: DeviceType;
  questions: {
    maxVal: string;
    minVal: string;
    question: string;
  }[];
};

export type Answer = {
  userId: string;
  answeredAt: number;
  answers: number[];
};

export interface QuestionsState {
  loading: boolean;
  error?: string;
  questionnaire: Questionnaire | undefined;
  answers: Answer[];
}

export type UploadAnswersDto = {
  sessionId: string;
  questionnaireId: string;
  answers: Answer[];
};

export type FetchQuestionnaireDTO = {
  userId: string;
  sensor: DeviceType;
};

export type FetchQuestionnaireResponse = Questionnaire;

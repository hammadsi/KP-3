import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller } from '../../../utils/apiCaller';

import {
  Answer,
  FetchAssignedQuestionnaireDTO,
  FetchQuestionnaireAnswersDTO,
  Questionnaire,
} from './questionnaires.interface';

export const fetchAssignedQuestionnaire = createAsyncThunk(
  'questionnaires/fetchAssignedQuestionnaire',
  async (data: FetchAssignedQuestionnaireDTO) => {
    const { userId, ...params } = data;
    return apiCaller<Questionnaire>({
      url: `questionnaires/assignments/${userId}`,
      method: 'GET',
      params,
    });
  },
);

export const fetchQuestionnaireAnswers = createAsyncThunk(
  'questionnaires/fetchQuestionnaireAnswers',
  async (data: FetchQuestionnaireAnswersDTO) => {
    const { questionnaireId, ...params } = data;
    return apiCaller<Answer[]>({
      url: `questionnaires/${questionnaireId}/answers`,
      method: 'GET',
      params,
    });
  },
);

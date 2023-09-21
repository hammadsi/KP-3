import {createAsyncThunk} from '@reduxjs/toolkit';

import {apiCaller} from '~utils/apiCaller';

import {
  FetchQuestionnaireDTO,
  FetchQuestionnaireResponse,
  UploadAnswersDto,
} from './questions.interface';

/**
 * Thunk action for uploading the answers stored in state to the database
 * @param data the request params
 * @see {@link UploadAnswersDto}
 */
export const uploadAnswers = createAsyncThunk(
  'questions/uploadAnswers',
  async (data: UploadAnswersDto) => {
    const {sessionId, questionnaireId, answers} = data;
    const promises: Promise<void>[] = [];
    for (const answer of answers) {
      const promise = apiCaller<void>({
        url: `questionnaires/${questionnaireId}/answers`,
        method: 'POST',
        data: {sessionId, ...answer},
      });
      promises.push(promise);
    }
    return await Promise.all(promises);
  },
);

/**
 * Thunk action for retrieving a questionnaire from the database.
 * @param data the request params
 * @see {@link FetchQuestionnaireDTO}
 */
export const fetchQuestionnaire = createAsyncThunk(
  'questions/fetchQuestionnaire',
  async (data: FetchQuestionnaireDTO) => {
    const {userId, ...params} = data;
    return apiCaller<FetchQuestionnaireResponse>({
      url: `questionnaires/assignments/${userId}`,
      method: 'GET',
      params,
    });
  },
);

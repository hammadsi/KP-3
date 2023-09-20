import { createSlice } from '@reduxjs/toolkit';

import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '../../../utils/thunk.utils';

import {
  fetchAssignedQuestionnaire,
  fetchQuestionnaireAnswers,
} from './questionnaires.actions';
import { QuestionnaireState } from './questionnaires.interface';

export const initialState: QuestionnaireState = {
  loading: false,
  error: undefined,
  data: [],
  questionnaire: undefined,
  answers: [],
};

const questionnairesSlice = createSlice({
  name: 'questionnaires',
  initialState,
  reducers: {
    clearQuestionnairesState: (state) => {
      state.loading = false;
      state.error = undefined;
      state.questionnaire = undefined;
      state.answers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignedQuestionnaire.fulfilled, (state, { payload }) => {
        state.questionnaire = payload;
      })
      .addCase(fetchQuestionnaireAnswers.fulfilled, (state, { payload }) => {
        state.answers = payload;
      })
      .addMatcher(
        (action) => isPendingAction(action, 'questionnaires'),
        (state) => {
          state.loading = true;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isFulfilledAction(action, 'questionnaires'),
        (state) => {
          state.loading = false;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isRejectedAction(action, 'questionnaires'),
        (state, { error }) => {
          state.loading = false;
          state.error = error.message;
        },
      );
  },
});

export const { clearQuestionnairesState } = questionnairesSlice.actions;

export default questionnairesSlice.reducer;

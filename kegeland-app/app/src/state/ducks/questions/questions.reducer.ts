import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '~utils/thunkUtils';

import {fetchQuestionnaire, uploadAnswers} from './questions.actions';
import {fetchQuestionnaireReducer} from './questions.helpers';
import {Answer, QuestionsState} from './questions.interface';

/**
 * The initial questions state
 */
export const initialState: QuestionsState = {
  loading: false,
  error: undefined,
  questionnaire: undefined,
  answers: [],
};

/**
 * The reducer for questions state
 */
export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    clearQuestionnaire: (state) => {
      state.questionnaire = undefined;
    },
    addAnswer: (state: QuestionsState, action: PayloadAction<Answer>) => {
      state.answers = [...state.answers, action.payload];
    },
    clearAnswers: (state: QuestionsState) => {
      state.answers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionnaire.fulfilled, fetchQuestionnaireReducer)
      .addCase(uploadAnswers.fulfilled, (state) => {
        state.answers = [];
      })
      .addMatcher(
        (action) => isPendingAction(action, 'questions'),
        (state) => {
          state.loading = true;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isFulfilledAction(action, 'questions'),
        (state) => {
          state.loading = false;
          state.error = undefined;
        },
      )
      .addMatcher(
        (action) => isRejectedAction(action, 'questions'),
        (state, {error}) => {
          state.loading = false;
          state.error = error.message;
        },
      );
  },
});

export const {clearQuestionnaire, clearAnswers, addAnswer} =
  questionsSlice.actions;

export default questionsSlice.reducer;

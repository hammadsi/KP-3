import {PayloadAction} from '@reduxjs/toolkit';

import {
  FetchQuestionnaireResponse,
  QuestionsState,
} from './questions.interface';

/**
 * Updates the state after fetching questionnaires
 * @param state the current state
 * @param action the action returned
 */
export const fetchQuestionnaireReducer = (
  state: QuestionsState,
  action: PayloadAction<FetchQuestionnaireResponse>,
) => {
  state.questionnaire = action.payload;
};

import {Questionnaire} from '~state/ducks/questions/questions.interface';

/**
 * Validates answers for a questionnaire
 * @param questionnaire the questionnaire
 * @param answers the answers
 * @returns true if answers are valid
 */
export const isValidAnswers = (
  questionnaire: Questionnaire,
  answers: number[],
) => {
  return questionnaire.questions.length === answers.length;
};

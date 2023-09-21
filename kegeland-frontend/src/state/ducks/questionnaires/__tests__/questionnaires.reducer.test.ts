import { apiCaller } from '../../../../utils/apiCaller';
import { store } from '../../../store';
import { SensorType } from '../../sensors/sensors.interface';
import answerResponce from '../mocks/answerResponse.mock';
import questionnairesResponce from '../mocks/questionnairesResponse.mock';
import {
  fetchAssignedQuestionnaire,
  fetchQuestionnaireAnswers,
} from '../questionnaires.actions';
import {
  clearQuestionnairesState,
  initialState,
} from '../questionnaires.reducer';

jest.mock('../../../../utils/apiCaller');

describe('Test questionnaires slice', () => {
  it('Should return initial state', () => {
    const state = store.getState().questionnaires;
    expect(state).toEqual(initialState);
  });

  it('clearQuestionnairesState should set initial error', async () => {
    (apiCaller as any).mockImplementation(() => Promise.reject(new Error()));
    store.dispatch(clearQuestionnairesState());
    const state = store.getState().questionnaires;
    expect(state).toEqual(initialState);
  });

  it('fetchAssignedQuestionnaire/rejected should set state error', async () => {
    const error = new Error('error');
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(
      fetchAssignedQuestionnaire({
        userId: '1234567',
        sensor: SensorType.FEMFIT,
      }),
    );
    const state = store.getState().questionnaires;
    expect(state.error).toStrictEqual(error.message);
  });

  it('fetchAssignedQuestionnaire/fulfilled should set questionnaire state', async () => {
    (apiCaller as any).mockImplementation(() =>
      Promise.resolve(questionnairesResponce),
    );
    await store.dispatch(
      fetchAssignedQuestionnaire({
        userId: '1246238013',
        sensor: SensorType.FEMFIT,
      }),
    );
    const state = store.getState().questionnaires;
    expect(state.questionnaire).toEqual(questionnairesResponce);
    expect(state.error).toBeFalsy();
    expect(state.loading).toBeFalsy();
  });

  it('fetchQuestionnaireAnswers/fulfilled should set answers state', async () => {
    (apiCaller as any).mockImplementation(() =>
      Promise.resolve(answerResponce),
    );
    await store.dispatch(
      fetchQuestionnaireAnswers({
        questionnaireId: '9x7rPmACKqoE48EUh3Ds',
        sessionId: '123',
      }),
    );
    const state = store.getState().questionnaires;
    expect(state.answers).toEqual(answerResponce);
    expect(state.error).toBeFalsy();
    expect(state.loading).toBeFalsy();
  });

  it('fetchQuestionnaireAnswers/rejected should set error state', async () => {
    const error = new Error('error');
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(
      fetchQuestionnaireAnswers({
        questionnaireId: '9x7rPmACKqoE48EUh3Ds',
        sessionId: '123',
      }),
    );
    const state = store.getState().questionnaires;
    expect(state.error).toStrictEqual(error.message);
  });
});

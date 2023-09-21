import {
  answerAfter,
  answerBefore,
  questionnaireMock,
} from '~state/ducks/__mocks__/questions.mock';
import {store} from '~state/store';
import * as apiCaller from '~utils/apiCaller';

import {fetchQuestionnaire, uploadAnswers} from '../questions.actions';
import questionsReducer, {
  addAnswer,
  clearAnswers,
  clearQuestionnaire,
  initialState,
} from '../questions.reducer';

describe('Test questions-reducer', () => {
  it('Should return initial state', () => {
    const state = store.getState().questions;
    expect(state).toEqual(initialState);
  });

  it('@questions/clearQuestionnaire should clear questionnaire', () => {
    const action = {
      type: clearQuestionnaire.type,
    };
    const state = questionsReducer(
      {...initialState, questionnaire: questionnaireMock},
      action,
    );
    expect(state).toEqual(initialState);
  });

  it('@questions/addAnswer should add answer', () => {
    const action = {
      type: addAnswer.type,
      payload: answerAfter,
    };
    const state = questionsReducer(
      {...initialState, answers: [answerBefore]},
      action,
    );
    expect(state).toEqual({
      ...initialState,
      answers: [answerBefore, answerAfter],
    });
  });

  it('@questions/clearAnswers should clear answers', () => {
    const action = {
      type: clearAnswers.type,
    };
    const state = questionsReducer(
      {...initialState, answers: [answerBefore, answerAfter]},
      action,
    );
    expect(state).toEqual(initialState);
  });

  it('@questions/fetchQuestionnaire/fullfilled should set questionnaire', () => {
    jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve());
    const action = {
      type: fetchQuestionnaire.fulfilled.type,
      payload: questionnaireMock,
    };
    const state = questionsReducer(initialState, action);
    expect(state).toEqual({...initialState, questionnaire: questionnaireMock});
  });
  it('@questions/uploadAnswers/fulfilled should clear answers', () => {
    jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve());
    const action = {
      type: uploadAnswers.fulfilled.type,
    };
    const state = questionsReducer(
      {...initialState, answers: [answerBefore, answerAfter]},
      action,
    );
    expect(state).toEqual(initialState);
  });

  describe('Should clear errors and loading state for fulfilled actions', () => {
    const error = new Error('Error');
    const startState = {...initialState, loading: true, error: error.message};
    const finalState = {
      ...initialState,
      loading: false,
      error: undefined,
    };
    beforeAll(() => {
      jest
        .spyOn(apiCaller, 'apiCaller')
        .mockImplementation(() => Promise.resolve());
    });

    it('@questions/fetchQuestionnaire/fulfilled', () => {
      const action = {
        type: fetchQuestionnaire.fulfilled.type,
      };
      const state = questionsReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@questions/uploadAnswers/fulfilled', () => {
      const action = {
        type: uploadAnswers.fulfilled.type,
      };
      const state = questionsReducer(startState, action);
      expect(state).toEqual(finalState);
    });
  });

  describe('Should set error message and clear loading for rejected actions', () => {
    const error = new Error('Error');
    const startState = {...initialState, loading: true};
    const finalState = {
      ...initialState,
      loading: false,
      error: error.message,
    };
    beforeAll(() => {
      jest
        .spyOn(apiCaller, 'apiCaller')
        .mockImplementation(() => Promise.reject(error));
    });

    it('@questions/fetchQuestionnaire/rejected', () => {
      const action = {
        type: fetchQuestionnaire.rejected.type,
        error,
      };
      const state = questionsReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@questions/uploadAnswers/rejected', () => {
      const action = {
        type: uploadAnswers.rejected.type,
        error,
      };
      const state = questionsReducer(startState, action);
      expect(state).toEqual(finalState);
    });
  });

  describe('Should clear error message and set loading for pending actions', () => {
    const startState = {...initialState, error: 'Error'};
    const finalState = {
      ...initialState,
      loading: true,
      error: undefined,
    };

    beforeAll(() => {
      jest
        .spyOn(apiCaller, 'apiCaller')
        .mockImplementation(() => Promise.resolve());
    });

    it('@questions/fetchQuestionnaire/pending', () => {
      const action = {
        type: fetchQuestionnaire.pending.type,
      };
      const state = questionsReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@questions/uploadAnswers/pending', () => {
      const action = {
        type: uploadAnswers.pending.type,
      };
      const state = questionsReducer(startState, action);
      expect(state).toEqual(finalState);
    });
  });
});

import {rawSessionMock} from '~state/ducks/__mocks__/session.mocks';
import {store} from '~state/store';
import * as apiCaller from '~utils/apiCaller';

import {uploadSession} from '../session.actions';
import sessionReducer, {
  clearSession,
  initialState,
  setSession,
} from '../session.reducer';

describe('Test session-reducer', () => {
  it('Should return initial state', () => {
    const state = store.getState().session;
    expect(state).toEqual(initialState);
  });

  it('@auth/setSession should set session', () => {
    const action = {
      type: setSession.type,
      payload: rawSessionMock,
    };
    const state = sessionReducer(initialState, action);
    expect(state).toEqual({...initialState, currentSession: rawSessionMock});
  });

  it('@auth/setSession with no payload should clear session', () => {
    const action = {
      type: clearSession.type,
    };
    const state = sessionReducer(
      {...initialState, currentSession: rawSessionMock},
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

    it('@auth/signInUser/rejected', () => {
      const action = {
        type: uploadSession.fulfilled.type,
      };
      const state = sessionReducer(startState, action);
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

    it('@session/upload/rejected', () => {
      const action = {
        type: uploadSession.rejected.type,
        error,
      };
      const state = sessionReducer(startState, action);
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

    it('@session/upload/pending', () => {
      const action = {
        type: uploadSession.pending.type,
      };
      const state = sessionReducer(startState, action);
      expect(state).toEqual(finalState);
    });
  });
});

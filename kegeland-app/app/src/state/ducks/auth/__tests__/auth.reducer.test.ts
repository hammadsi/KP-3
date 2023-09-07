import loginResponse, {signedInState} from '~state/ducks/__mocks__/auth.mocks';
import {store} from '~state/store';
import * as apiCaller from '~utils/apiCaller';

import {
  resetPassword,
  signInUser,
  signOutUser,
  signUpUser,
  silentRefresh,
} from '../auth.actions';
import authReducer, {clearError, initialState} from '../auth.reducer';

describe('Test auth-reducer', () => {
  it('Should return initial state', () => {
    const state = store.getState().auth;
    expect(state).toEqual(initialState);
  });

  it('@auth/clearError should clear errors', () => {
    const action = {
      type: clearError.type,
    };
    const state = authReducer({...initialState, error: 'Error'}, action);
    expect(state).toEqual(initialState);
  });

  it('@auth/signInUser/fulfilled should set signed-in state', () => {
    jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve(loginResponse));
    const action = {
      type: signInUser.fulfilled.type,
      payload: loginResponse,
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual(signedInState);
  });

  it('@auth/signOutUser/fulfilled should set signed-out state', () => {
    const action = {
      type: signOutUser.fulfilled.type,
    };
    const state = authReducer(signedInState, action);
    expect(state).toEqual(initialState);
  });

  it('@auth/signOutUser/rejected should set signed-out state', () => {
    const action = {
      type: signOutUser.rejected.type,
      error: new Error('Error'),
    };
    const state = authReducer(signedInState, action);
    expect(state).toEqual({...initialState, error: 'Error'});
  });

  it('@auth/signUpUser/fulfilled should set signed-out state', () => {
    const action = {
      type: signUpUser.fulfilled.type,
      payload: loginResponse,
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual(signedInState);
  });

  it('@auth/silentRefresh/rejected should set signed-out state', () => {
    const action = {
      type: silentRefresh.rejected.type,
      error: new Error('Error'),
    };
    const state = authReducer(signedInState, action);
    expect(state).toEqual({...initialState, error: 'Error'});
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

    it('@auth/signInUser/rejected', () => {
      const action = {
        type: signInUser.rejected.type,
        error,
      };
      const state = authReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@auth/signOutUser/rejected', () => {
      const action = {
        type: signOutUser.rejected.type,
        error,
      };
      const state = authReducer(startState, action);
      expect(state).toEqual(finalState);
    });
    it('@auth/signUpUser/rejected', () => {
      const action = {
        type: signUpUser.rejected.type,
        error,
      };
      const state = authReducer(startState, action);
      expect(state).toEqual(finalState);
    });
    it('@auth/silentRefresh/rejected', () => {
      const action = {
        type: silentRefresh.rejected.type,
        error,
      };
      const state = authReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@auth/resetPassword/rejected', () => {
      const action = {
        type: resetPassword.rejected.type,
        error,
      };
      const state = authReducer(startState, action);
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

    it('@auth/signInUser/pending', () => {
      const action = {
        type: signInUser.pending.type,
      };
      const state = authReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@auth/signOutUser/pending', () => {
      const action = {
        type: signOutUser.pending.type,
      };
      const state = authReducer(startState, action);
      expect(state).toEqual(finalState);
    });
    it('@auth/signUpUser/pending', () => {
      const action = {
        type: signUpUser.pending.type,
      };
      const state = authReducer(startState, action);
      expect(state).toEqual(finalState);
    });
    it('@auth/silentRefresh/pending', () => {
      const action = {
        type: silentRefresh.pending.type,
      };
      const state = authReducer(startState, action);
      expect(state).toEqual(finalState);
    });

    it('@auth/resetPassword/pending', () => {
      const action = {
        type: resetPassword.pending.type,
      };
      const state = authReducer(startState, action);
      expect(state).toEqual(finalState);
    });
  });
});

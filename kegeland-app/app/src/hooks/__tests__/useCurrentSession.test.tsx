import React from 'react';
import {renderHook} from '@testing-library/react-hooks/native';
import {Provider} from 'react-redux';
import {cloneDeep, map, set} from 'lodash';
import {waitFor as jestWaitFor, act} from '@testing-library/react-native';

import * as apiCaller from '~utils/apiCaller';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import {AuthState} from '~state/ducks/auth/auth.interface';
import {
  answerAfter,
  answerBefore,
  questionnaireMock,
} from '~state/ducks/__mocks__/questions.mock';
import {sessionMock} from '~state/ducks/__mocks__/session.mocks';
import useCurrentSession from '~hooks/useCurrentSession';
import {uploadSession} from '~state/ducks/session/session.actions';
import {clearSession} from '~state/ducks/session/session.reducer';
import {clearAnswers} from '~state/ducks/questions/questions.reducer';
import {uploadAnswers} from '~state/ducks/questions/questions.actions';
const authUser = {id: 'asdnqiqw', email: 'test@test.no'};
describe('Test useCurrentSession-hook', () => {
  it('should upload session with answers', async () => {
    jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve({id: '123f31'}));
    const stateCp = cloneDeep(initialStore);
    set(stateCp, 'auth', {
      ...stateCp.auth,
      isSignedIn: true,
      authUser,
    } as AuthState);
    set(stateCp, 'questions', {
      ...stateCp.questions,
      questionnaire: questionnaireMock,
      answers: [answerBefore, answerAfter],
    });
    set(stateCp, 'session', {
      ...stateCp.session,
      currentSession: sessionMock,
    });

    const store = mockStore(stateCp);
    const {result} = renderHook(() => useCurrentSession(true), {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.upload();
    });
    const expectedActions = [
      uploadSession.fulfilled.type,
      uploadAnswers.fulfilled.type,
      clearSession.type,
      clearAnswers.type,
    ];
    await jestWaitFor(() => {
      expect(map(store.getActions(), 'type')).toStrictEqual(expectedActions);
    });
  });

  it('should upload session without answers', async () => {
    jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve({id: '123f31'}));
    const stateCp = cloneDeep(initialStore);
    set(stateCp, 'auth', {
      ...stateCp.auth,
      isSignedIn: true,
      authUser,
    } as AuthState);
    set(stateCp, 'session', {
      ...stateCp.session,
      currentSession: sessionMock,
    });

    const store = mockStore(stateCp);
    const {result} = renderHook(() => useCurrentSession(false), {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.upload();
    });
    const expectedActions = [
      uploadSession.fulfilled.type,
      clearSession.type,
      clearAnswers.type,
    ];
    await jestWaitFor(() => {
      expect(map(store.getActions(), 'type')).toStrictEqual(expectedActions);
    });
  });
});

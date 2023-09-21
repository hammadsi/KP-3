import React from 'react';
import {renderHook} from '@testing-library/react-hooks/native';
import {Provider} from 'react-redux';
import {cloneDeep, map, set} from 'lodash';
import {waitFor as jestWaitFor} from '@testing-library/react-native';

import * as apiCaller from '~utils/apiCaller';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import {AuthState} from '~state/ducks/auth/auth.interface';
import {questionnaireMock} from '~state/ducks/__mocks__/questions.mock';
import {fetchQuestionnaire} from '~state/ducks/questions/questions.actions';
import useQuestionnaire from '~hooks/useQuestionnaire';
const authUser = {id: 'asdnqiqw', email: 'test@test.no'};
describe('Test useQuestionnaire-hook', () => {
  it('should fetch questionnaire', async () => {
    jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve(questionnaireMock));
    const stateCp = cloneDeep(initialStore);
    set(stateCp, 'auth', {
      ...stateCp.auth,
      isSignedIn: true,
      authUser,
    } as AuthState);

    const store = mockStore(stateCp);
    renderHook(() => useQuestionnaire('femfit'), {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    const expectedActions = [fetchQuestionnaire.fulfilled.type];
    await jestWaitFor(() => {
      expect(map(store.getActions(), 'type')).toStrictEqual(expectedActions);
    });
  });
});

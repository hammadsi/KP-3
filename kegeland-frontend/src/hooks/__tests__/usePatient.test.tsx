import { renderHook, waitFor } from '@testing-library/react';
import { map } from 'lodash';
import moment from 'moment';
import { Provider } from 'react-redux';

import { sessionsMock } from '../../components/mocks/sessions.mock';
import { fetchSessions } from '../../state/ducks/sessions/sessions.actions';
import { mockStore } from '../../state/mocks/store.mock';
import * as apiCaller from '../../utils/apiCaller';
import usePatient from '../usePatient';

describe('Test usePatient-hook', () => {
  const store = mockStore();

  beforeEach(() => {
    jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve(sessionsMock));
  });

  it('Should update x labels', async () => {
    const { result } = renderHook(() => usePatient('patientId'), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    await waitFor(() => {
      expect(map(store.getActions(), 'type')).toContain(
        fetchSessions.fulfilled.type,
      );
    });

    expect(result.current.data).toEqual(sessionsMock);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.details).toEqual({
      sessionsThisWeek: 0,
      lastSessionDelta: moment(sessionsMock[0].createdAt).fromNow(),
      sessionsTotal: 2,
    });
  });
});

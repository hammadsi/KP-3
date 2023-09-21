import { renderHook, waitFor } from '@testing-library/react';
import { map } from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';

import fetchPatentsResponseMock from '../../state/ducks/patients/mocks/fetchPatientsRespnse.mock';
import { fetchPatients } from '../../state/ducks/patients/patients.actions';
import { mockStore } from '../../state/mocks/store.mock';
import * as apiCaller from '../../utils/apiCaller';
import usePatientList from '../usePatientList';

describe('Test usePatientList-hook', () => {
  const store = mockStore();

  beforeEach(() => {
    jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve(fetchPatentsResponseMock));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return patients list', async () => {
    const { result } = renderHook(() => usePatientList(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    await waitFor(() => {
      expect(map(store.getActions(), 'type')).toContain(
        fetchPatients.fulfilled.type,
      );
    });

    expect(result.current.patients).toEqual(fetchPatentsResponseMock);
    expect(result.current.loading).toBeFalsy();
  });
});

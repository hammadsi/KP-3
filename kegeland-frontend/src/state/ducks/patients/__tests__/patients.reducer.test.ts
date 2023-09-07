import { store } from '../../../store';
import { apiCaller } from '../../../../utils/apiCaller';
import { fetchPatientById, fetchPatients } from '../patients.actions';
import { clearPatientsState, initialState } from '../patients.reducer';
import fetchPatentByIdResponse from '../mocks/fetchPatientByIdResponse.mock';
import fetchPatentsResponseMock from '../mocks/fetchPatientsRespnse.mock';

jest.mock('../../../../utils/apiCaller');

describe('Test patients slice', () => {
  it('Should return initial state', () => {
    const state = store.getState().patients;
    expect(state).toEqual(initialState);
  });

  it('clearPatientsState should set initial error', async () => {
    const error = new Error('Error');
    (apiCaller as any).mockImplementation(() => Promise.reject(error.message));
    store.dispatch(clearPatientsState());
    const state = store.getState().patients;
    expect(state).toEqual(initialState);
  });

  it('fetchPatientByid/rejected should set state error', async () => {
    const error = new Error('Error');
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(fetchPatientById('123456'));
    const state = store.getState().patients;
    expect(state.error).toStrictEqual(error.message);
  });

  it('fetchPatientById/fulfilled should set patient state', async () => {
    (apiCaller as any).mockImplementation(() =>
      Promise.resolve(fetchPatentByIdResponse),
    );
    await store.dispatch(fetchPatientById('123'));
    const state = store.getState().patients;
    expect(state.patient).toEqual(fetchPatentByIdResponse);
    expect(state.loading).toBeFalsy();
    expect(state.error).toBeFalsy();
  });

  it('fetchPatients/fulfilled should set patients state', async () => {
    (apiCaller as any).mockImplementation(() =>
      Promise.resolve(fetchPatentsResponseMock),
    );
    await store.dispatch(fetchPatients());
    const state = store.getState().patients;

    expect(state.data).toEqual(fetchPatentsResponseMock);
    expect(state.loading).toBeFalsy();
    expect(state.error).toBeFalsy();
  });

  it('fetchPatientById/rejected should set error', async () => {
    const error = new Error('Error');
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(fetchPatientById('123'));
    const state = store.getState().patients;

    expect(state.loading).toBeFalsy();
    expect(state.error).toStrictEqual(error.message);
  });

  it('fetchPatients/rejected should set error', async () => {
    const error = new Error('Error');
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(fetchPatients());
    const state = store.getState().patients;

    expect(state.loading).toBeFalsy();
    expect(state.error).toStrictEqual(error.message);
  });
});

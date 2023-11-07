import { store } from '../../../store';
import { refresh, signInUser, signOutUser, signUpUser } from '../auth.actions';
import { initialState } from '../auth.reducer';
import { apiCaller } from '../../../../utils/apiCaller';
import loginResponseMock from '../mocks/loginResponse.mock';
import { PatientType, UserRole } from '../auth.interface';
import refreshResponseMock from '../mocks/refreshResponse.mock';
import { retrieveTokens } from '../../../../utils/storage';

jest.mock('../../../../utils/apiCaller');

describe('Test auth slice', () => {
  beforeAll(async () => {
    localStorage.setItem('access_token', 'access token');
    localStorage.setItem('id_token', 'id token');
    localStorage.setItem('refresh_token', 'refresh token');
  });

  afterAll(async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
  });

  it('Should return initial state', () => {
    const state = store.getState().auth;
    expect(state).toEqual(initialState);
  });

  it('signInUser/rejected should set state error', async () => {
    const error = new Error('Error');
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(
      signInUser({ email: 'ola.nordmann@gmail.com', password: '12324' }),
    );
    const state = store.getState().auth;
    expect(state.error).toStrictEqual(error.message);
  });

  it('signInUser/fulfilled should set authorized state', async () => {
    (apiCaller as any).mockImplementation(() =>
      Promise.resolve(loginResponseMock),
    );
    await store.dispatch(
      signInUser({ email: 'ola.nordmann@gmail.com', password: '12324' }),
    );
    const state = store.getState().auth;
    const newState = {
      ...initialState,
      loading: false,
      isSignedIn: true,
      authUser: { id: loginResponseMock.id, email: loginResponseMock.email },
      userDetails: loginResponseMock.details,
      error: undefined,
    };
    expect(state).toEqual(newState);
  });

  it('signOutUser/fulfilled should set unauthorized state', async () => {
    (apiCaller as any).mockImplementation(() => Promise.resolve());
    await store.dispatch(signOutUser());
    const state = store.getState().auth;
    const newState = {
      ...initialState,
      loading: false,
      isSignedIn: false,
      authUser: undefined,
      userDetails: undefined,
      error: undefined,
    };
    expect(state).toEqual(newState);
  });

  it('signOutUser/rejected should set unauthorized state', async () => {
    const error = new Error('Error');
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(signOutUser());
    const state = store.getState().auth;
    const newState = {
      ...initialState,
      loading: false,
      isSignedIn: false,
      authUser: undefined,
      userDetails: undefined,
      error: error.message,
    };
    expect(state).toEqual(newState);
  });

  it('signUpUser/rejected should set error', async () => {
    const error = new Error('Error');
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(
      signUpUser({
        name: { firstName: 'ola', lastName: 'Nordmann' },
        roles: [UserRole.PHYSICIAN],
        patientType: [PatientType.WHEELCHAIR],
        email: 'ola.nordmann@gmail.com',
        password: '1234567',
        wheelchairPatient: {
          id: 'id',
          name: 'name',
          birthdate: '2021-01-01',
          currentPhysicalState: {
            averageHeartRate: 0,
            averageWheelchairSpeed: 0,
            height: 0,
            maxHeartRate: 0,
            maxWheelchairSpeed: 0,
            weight: 0,
          },
          gameSessions: [],
          gender: 'M',
        },
      }),
    );
    const state = store.getState().auth;
    expect(state.error).toStrictEqual(error.message);
  });

  it('signUpUser/fulfilled should set authorized state', async () => {
    (apiCaller as any).mockImplementation(() =>
      Promise.resolve(loginResponseMock),
    );
    await store.dispatch(
      signUpUser({
        name: { firstName: 'ola', lastName: 'Nordmann' },
        roles: [UserRole.PHYSICIAN],
        patientType: [PatientType.WHEELCHAIR],
        email: 'ola.nordmann@gmail.com',
        password: '1234567',
        wheelchairPatient: {
          id: 'id',
          name: 'name',
          birthdate: '2021-01-01',
          currentPhysicalState: {
            averageHeartRate: 0,
            averageWheelchairSpeed: 0,
            height: 0,
            maxHeartRate: 0,
            maxWheelchairSpeed: 0,
            weight: 0,
          },
          gameSessions: [],
          gender: 'M',
        },
      }),
    );
    const state = store.getState().auth;
    const newState = {
      ...initialState,
      loading: false,
      isSignedIn: true,
      authUser: { id: loginResponseMock.id, email: loginResponseMock.email },
      userDetails: loginResponseMock.details,
      error: undefined,
    };
    expect(state).toEqual(newState);
  });

  it('refresh/rejected should set unauthorized state', async () => {
    const error = new Error('Error');
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(refresh());
    const state = store.getState().auth;
    expect(state.loading).toBeFalsy();
    expect(state.isSignedIn).toBeFalsy();
    expect(state.authUser).toBeFalsy();
    expect(state.userDetails).toBeFalsy();
    expect(state.error).toStrictEqual(error.message);
  });

  it('refresh/resolved should set refreshtoken state', async () => {
    (apiCaller as any).mockImplementation(() =>
      Promise.resolve(refreshResponseMock),
    );
    await store.dispatch(refresh());
    // eslint-disable-next-line camelcase
    const { refresh_token, id_token, access_token } = await retrieveTokens();
    expect(refresh_token).toBe(refreshResponseMock.refreshToken);
    expect(id_token).toBe(refreshResponseMock.idToken);
    expect(access_token).toBe(refreshResponseMock.accessToken);
  });
});

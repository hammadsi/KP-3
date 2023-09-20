import { apiCaller } from '../../../../utils/apiCaller';
import { store } from '../../../store';
import { SensorType } from '../../sensors/sensors.interface';
import sessionByIdResponce from '../mocks/sessionByIdResponce.mock';
import { fetchSessionById, fetchSessions } from '../sessions.actions';
import { clearSessionsState, initialState } from '../sessions.reducer';

jest.mock('../../../../utils/apiCaller');
const error = new Error('error');
describe('Test sensor slice', () => {
  it('Should return initial state', () => {
    const state = store.getState().sessions;
    expect(state).toEqual(initialState);
  });

  it('clearSessionsState should set initial error', async () => {
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    store.dispatch(clearSessionsState());
    const state = store.getState().sessions;
    expect(state).toEqual(initialState);
  });

  it('fetchSessionById/rejected should set state error', async () => {
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(fetchSessionById('hei'));
    const state = store.getState().sessions;
    expect(state.error).toStrictEqual(error.message);
  });

  it('fetchSessionById/fulfilled should set session state', async () => {
    (apiCaller as any).mockImplementation(() =>
      Promise.resolve(sessionByIdResponce),
    );
    await store.dispatch(fetchSessionById('xLsSlzvWMTBiZXDBm2wW'));
    const state = store.getState().sessions;
    expect(state.session).toEqual(sessionByIdResponce);
    expect(state.error).toBeFalsy();
    expect(state.loading).toBeFalsy();
  });

  it('fetchSessions/rejected should set state error', async () => {
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(
      fetchSessions({
        userId: '16L4x6AmAohaKniCnBToa3jUZPk2',
        sensor: SensorType.FEMFIT,
      }),
    );
    const state = store.getState().sessions;
    expect(state.error).toStrictEqual(error.message);
  });

  it('fetchSessions/fulfilled should set session state', async () => {
    (apiCaller as any).mockImplementation(() =>
      Promise.resolve(sessionByIdResponce),
    );
    await store.dispatch(fetchSessionById('xLsSlzvWMTBiZXDBm2wW'));
    const state = store.getState().sessions;
    expect(state.session).toEqual(sessionByIdResponce);
    expect(state.error).toBeFalsy();
    expect(state.loading).toBeFalsy();
  });

  //   it('fetchSensor2/fulfilled should set sensor state for two senors', async () => {
  //     (apiCaller as any).mockImplementation(() =>
  //       Promise.resolve(sensorsFemfitEmpaticaResponce),
  //     );
  //     await store.dispatch(fetchSensor(SensorType.FEMFIT));
  //     await store.dispatch(fetchSensor(SensorType.EMPATICA));
  //     const state = store.getState().sensors;
  //     expect(state.data[SensorType.FEMFIT]).toEqual(
  //       sensorsFemfitEmpaticaResponce.data.femfit,
  //     );
  //     expect(state.data[SensorType.EMPATICA]).toEqual(
  //       sensorsFemfitEmpaticaResponce.data.empatica,
  //     );
  //     expect(Object.keys(state.data).length).toBe(2);
  //     expect(state.error).toBeFalsy();
  //     expect(state.loading).toBeFalsy();
  //   });
});

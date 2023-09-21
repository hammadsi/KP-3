import { apiCaller } from '../../../../utils/apiCaller';
import { store } from '../../../store';
import { sensorFemfitRespose } from '../mocks/sensorsResponse.mock';
import { fetchSensor } from '../sensors.actions';
import { SensorType } from '../sensors.interface';
import { clearSensorsState, initialState } from '../sensors.reducer';

jest.mock('../../../../utils/apiCaller');
const error = new Error('error');
describe('Test sensor slice', () => {
  it('Should return initial state', () => {
    const state = store.getState().sensors;
    expect(state).toEqual(initialState);
  });

  it('clearSensorsState should set initial error', async () => {
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    store.dispatch(clearSensorsState());
    const state = store.getState().sensors;
    expect(state).toEqual(initialState);
  });

  it('fetchSensor/rejected should set state error', async () => {
    (apiCaller as any).mockImplementation(() => Promise.reject(error));
    await store.dispatch(fetchSensor(SensorType.FEMFIT));
    const state = store.getState().sensors;
    expect(state.error).toStrictEqual(error.message);
  });

  it('fetchSensor/fulfilled should set sensor state', async () => {
    (apiCaller as any).mockImplementation(() =>
      Promise.resolve(sensorFemfitRespose),
    );
    await store.dispatch(fetchSensor(SensorType.FEMFIT));
    const state = store.getState().sensors;
    expect(state.data[SensorType.FEMFIT]).toEqual(sensorFemfitRespose);
    expect(state.error).toBeFalsy();
    expect(state.loading).toBeFalsy();
  });
});

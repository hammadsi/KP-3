import { store } from '../../../store';
import { SensorType } from '../../sensors/sensors.interface';
import graphProfileMocks from '../mocks/graphProfile.mocks';
import { initialState, setGraphProfile } from '../settings.reducer';

describe('Test settings slice', () => {
  it('Should return initial state', () => {
    const state = store.getState().settings;
    expect(state).toEqual(initialState);
  });

  it('setGraphProfile should set state error', async () => {
    store.dispatch(
      setGraphProfile({
        sensor: SensorType.FEMFIT,
        profile: graphProfileMocks,
      }),
    );
    const state = store.getState().settings;
    expect(state.graph.empatica).toBeFalsy();
    expect(state.graph.femfit).toEqual(graphProfileMocks);
  });
});

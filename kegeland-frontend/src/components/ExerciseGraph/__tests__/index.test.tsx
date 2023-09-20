import { merge } from 'lodash';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import ExerciseGraph from '..';
import { sensorFemfitRespose } from '../../../state/ducks/sensors/mocks/sensorsResponse.mock';
import { SensorType } from '../../../state/ducks/sensors/sensors.interface';
import sessionByIdResponce from '../../../state/ducks/sessions/mocks/sessionByIdResponce.mock';
import graphProfileMocks from '../../../state/ducks/settings/mocks/graphProfile.mocks';
import { SettingsState } from '../../../state/ducks/settings/settings.interface';
import { initialState } from '../../../state/ducks/settings/settings.reducer';
import { initialStore, mockStore } from '../../../state/mocks/store.mock';

describe('Test exrecise index', () => {
  const settingsState: SettingsState = {
    ...initialState,
    graph: {
      [SensorType.FEMFIT]: graphProfileMocks,
      [SensorType.EMPATICA]: undefined,
      [SensorType.IMU]: undefined,
    },
  };

  const store = mockStore(merge({ settings: settingsState }, initialStore));

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ExerciseGraph
            sensor={sensorFemfitRespose}
            session={sessionByIdResponce}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { merge } from 'lodash';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import { SensorType } from '../../../state/ducks/sensors/sensors.interface';
import graphProfileMocks from '../../../state/ducks/settings/mocks/graphProfile.mocks';
import { SettingsState } from '../../../state/ducks/settings/settings.interface';
import { initialState } from '../../../state/ducks/settings/settings.reducer';
import { initialStore, mockStore } from '../../../state/mocks/store.mock';
import GraphOptionsModal from '../GraphOptionsModal';

describe('Test graph options modal', () => {
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
          <GraphOptionsModal
            sensor={{
              id: 'sensorId',
              name: SensorType.FEMFIT,
              labels: ['s1', 's2', 's3'],
            }}
            updatePlot={jest.fn()}
            resetPlot={jest.fn()}
            updateXAxis={jest.fn()}
            isOpen={false}
            onClose={jest.fn()}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

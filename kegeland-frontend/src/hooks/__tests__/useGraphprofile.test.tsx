import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { merge } from 'lodash';

import { sensorFemfitRespose } from '../../state/ducks/sensors/mocks/sensorsResponse.mock';
import { initialStore, mockStore } from '../../state/mocks/store.mock';
import sessionByIdResponce from '../../state/ducks/sessions/mocks/sessionByIdResponce.mock';
import useGraphProfile from '../useGraphProfile';
import { initialState } from '../../state/ducks/settings/settings.reducer';
import { SensorType } from '../../state/ducks/sensors/sensors.interface';
import graphProfileMocks from '../../state/ducks/settings/mocks/graphProfile.mocks';
import { SettingsState } from '../../state/ducks/settings/settings.interface';
import { getXLabels } from '../../utils/graph.utils';

const xLabelsT = getXLabels(
  Object.keys(sessionByIdResponce.data).map((key) => {
    return Number(key);
  }),
  true,
);

describe('Test useGraphProfile-hook', () => {
  const settingsState: SettingsState = {
    ...initialState,
    graph: {
      [SensorType.FEMFIT]: graphProfileMocks,
      [SensorType.EMPATICA]: undefined,
      [SensorType.IMU]: undefined,
    },
  };
  const store = mockStore(merge({ settings: settingsState }, initialStore));

  it('should return x labels, and list of datapoints one of the sensor label for all the timestamps', async () => {
    const { result } = renderHook(
      () => useGraphProfile(sensorFemfitRespose, sessionByIdResponce),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );

    expect(result.current.chartData?.labels).toEqual(xLabelsT);
    expect(result.current.chartData?.datasets[0].data).toEqual(
      Object.values(sessionByIdResponce.data).map((value) => {
        return value[0];
      }),
    );
    expect(result.current.chartData?.datasets[1].data).toEqual(
      Object.values(sessionByIdResponce.data).map((value) => {
        return value[1];
      }),
    );
    expect(result.current.chartData?.datasets[2].data).toEqual(
      Object.values(sessionByIdResponce.data).map((value) => {
        return value[2];
      }),
    );
    expect(result.current.chartData?.datasets[3].data).toEqual(
      Object.values(sessionByIdResponce.data).map((value) => {
        return value[3];
      }),
    );
  });

  it('Should update sensor plotType in state', async () => {
    const settingsState: SettingsState = {
      ...initialState,
      graph: {
        [SensorType.FEMFIT]: graphProfileMocks,
        [SensorType.EMPATICA]: undefined,
        [SensorType.IMU]: undefined,
      },
    };
    const store = mockStore(merge({ settings: settingsState }, initialStore));

    const { result } = renderHook(
      () => useGraphProfile(sensorFemfitRespose, sessionByIdResponce),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );
    result.current.updatePlot('p1', 'line');

    const newResult = store.getState();

    expect(newResult.settings.graph.femfit?.labels.p1.plotType).toEqual('line');
  });

  it('Should update x labels', async () => {
    const settingsState: SettingsState = {
      ...initialState,
      graph: {
        [SensorType.FEMFIT]: graphProfileMocks,
        [SensorType.EMPATICA]: undefined,
        [SensorType.IMU]: undefined,
      },
    };
    const store = mockStore(merge({ settings: settingsState }, initialStore));

    const { result } = renderHook(
      () => useGraphProfile(sensorFemfitRespose, sessionByIdResponce),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );
    act(() => {
      result.current.updateXAxis(false);
    });
    const newResult = store.getState();
    expect(newResult.settings.graph.femfit?.useTimedelta).toEqual(false);
  });
});

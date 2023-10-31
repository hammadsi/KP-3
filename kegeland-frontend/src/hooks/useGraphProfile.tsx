import {
  ChartData,
  ChartEvent,
  ChartOptions,
  ChartType,
  LegendItem,
} from 'chart.js';
import { cloneDeep, merge, set } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

import { Sensor } from '../state/ducks/sensors/sensors.interface';
import {
  Session,
  SessionDataPoint,
} from '../state/ducks/sessions/sessions.interface';
import { setGraphProfile } from '../state/ducks/settings/settings.reducer';
import {
  getLabelIndex,
  getXLabels,
  initChartData,
  initGraphProfile,
  splitSensorData,
} from '../utils/graph.utils';

import useAppDispatch from './useAppDispatch';
import useGraphProfileSelector from './useGraphProfileSelector';

const useGraphProfile = (sensor: Sensor, session: Session) => {
  const dispatch = useAppDispatch();
  const profile = useGraphProfileSelector(sensor.name);
  const chartRef = useRef<ChartJSOrUndefined>();
  const yDataRef = useRef<SessionDataPoint[][]>(
    splitSensorData(sensor, session),
  );
  const xDataRef = useRef<number[]>(
    Object.keys(session.data).map((val) => Number(val)),
  );
  const [chartData, setChartData] = useState<ChartData>();

  const handleHideLabel = (_event: ChartEvent, item: LegendItem) => {
    const key = item.text;
    const idx = getLabelIndex(sensor, key);

    if (profile && idx !== undefined) {
      const isHidden = chartRef.current?.data.datasets[idx].hidden;
      const newProfile = set(
        cloneDeep(profile),
        ['labels', key, 'hidden'],
        !isHidden,
      );
      dispatch(setGraphProfile({ sensor: sensor.name, profile: newProfile }));
      if (chartRef.current) {
        chartRef.current.data.datasets[idx].hidden = !isHidden;
        chartRef.current.update();
      }
    }
  };

  const updatePlot = useCallback(
    (label: string, plot: ChartType) => {
      const idx = getLabelIndex(sensor, label);
      if (profile && idx !== undefined) {
        const newProfile = set(
          cloneDeep(profile),
          ['labels', label, 'plotType'],
          plot,
        );
        dispatch(setGraphProfile({ sensor: sensor.name, profile: newProfile }));
        if (chartRef.current?.data) {
          chartRef.current.data.datasets[idx].type = plot;
          chartRef.current.update();
        }
      }
    },
    [profile],
  );

  const updateXAxis = useCallback(
    (value: boolean) => {
      if (profile) {
        const newProfile = set(cloneDeep(profile), ['useTimedelta'], value);
        dispatch(setGraphProfile({ sensor: sensor.name, profile: newProfile }));
        if (chartRef.current?.data) {
          const xLabels = getXLabels(xDataRef.current, value);
          setChartData(initChartData(xLabels, yDataRef.current, profile));
          chartRef.current.update();
        }
      }
    },
    [profile],
  );

  const resetPlot = useCallback(() => {
    const newProfile = initGraphProfile(sensor);
    dispatch(setGraphProfile({ sensor: sensor.name, profile: newProfile }));
    const xLabels = getXLabels(xDataRef.current, newProfile.useTimedelta);
    const newChartData = initChartData(xLabels, yDataRef.current, newProfile);
    setChartData(newChartData);
  }, [profile]);

  useEffect(() => {
    if (!profile) {
      const newProfile = initGraphProfile(sensor);
      const xLabels = getXLabels(xDataRef.current, newProfile.useTimedelta);
      setChartData(initChartData(xLabels, yDataRef.current, newProfile));
      dispatch(setGraphProfile({ sensor: sensor.name, profile: newProfile }));
    } else {
      const xLabels = getXLabels(xDataRef.current, profile.useTimedelta);
      setChartData(initChartData(xLabels, yDataRef.current, profile));
    }
  }, []);

  return {
    options: merge(options, {
      plugins: {
        legend: {
          onClick: handleHideLabel,
        },
      },
    }) as ChartOptions,
    chartData,
    chartRef,
    updatePlot,
    resetPlot,
    updateXAxis,
  };
};

const options: ChartOptions<'line'> = {
  responsive: true,
  animation: false,
  spanGaps: true,
  elements: {
    line: {
      tension: 0.1,
    },
  },
  datasets: {
    bar: {},
    line: {
      pointRadius: 0,
      tension: 0.1,
    },
    scatter: {
      showLine: false,
    },
  },
  interaction: {
    mode: 'index' as const,
    intersect: true,
  },
  scales: {
    y: {
      stacked: false,
    },
    x: {
      stacked: false,
      position: 'bottom',
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    zoom: {
      zoom: {
        mode: 'xy',
        pinch: {
          enabled: true,
        },
        wheel: {
          enabled: true,
          modifierKey: 'ctrl',
        },
      },
      pan: {
        enabled: true,
        mode: 'xy',
      },
    },
  },
};

export default useGraphProfile;

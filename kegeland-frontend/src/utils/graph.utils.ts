import { ChartData, ChartDataset } from 'chart.js';
import { size } from 'lodash';
import moment from 'moment';

import { GRAPH_COLORS } from '../constants/graph.constants';
import { Sensor } from '../state/ducks/sensors/sensors.interface';
import {
  Session,
  SessionDataPoint,
} from '../state/ducks/sessions/sessions.interface';
import {
  GraphLabels,
  GraphProfile,
} from '../state/ducks/settings/settings.interface';

export const getLabelIndex = (sensor: Sensor, key: string) => {
  const idx = sensor.labels.indexOf(key);
  return idx !== -1 ? idx : undefined;
};

export const getSessionDuration = (session: Session) => {
  if (size(session.data) > 1) {
    const ts = Object.keys(session.data);
    return Number(ts[ts.length - 1]) - Number(ts[0]);
  }
  return 0;
};

export const splitSensorData = (sensor: Sensor, session: Session) => {
  const data: Array<SessionDataPoint[]> = Array.from(
    Array(sensor.labels.length),
    () => [],
  );
  Object.values(session.data).forEach((row) => {
    row.forEach((val, idx) => data[idx].push(val));
  });
  return data;
};

export const initGraphProfile = (sensor: Sensor) => {
  return {
    useTimedelta: false,
    labels: sensor.labels.reduce((prev, curr) => {
      prev[curr] = {
        plotType: 'line',
        hidden: false,
      };
      return prev;
    }, {} as GraphLabels),
  } as GraphProfile;
};

export const getXLabels = (xData: number[], useDelta: boolean) => {
  if (useDelta) {
    return getTimedeltaLabels(xData);
  }
  return getDateLabels(xData);
};

export const getDateLabels = (xData: number[]) => {
  return xData.map((val) => moment(val).format('LTS')); // new Date(Number(val)));
};

export const getTimedeltaLabels = (xData: number[]) => {
  const start = xData[0];
  return [0, ...xData.slice(1).map((val) => val - start)];
};

export const initChartData = (
  xData: (number | string)[],
  yData: SessionDataPoint[][],
  profile: GraphProfile,
): ChartData => {
  return {
    labels: xData,
    datasets: Object.entries(profile.labels).map(([key, val], idx) => {
      const color = getColor(idx);
      return {
        label: key,
        type: val.plotType,
        hidden: val.hidden,
        backgroundColor: color,
        borderColor: color,
        xAxisID: 'x',
        data: yData[idx],
      } as ChartDataset;
    }),
  };
};

export const getColor = (idx: number) => {
  return GRAPH_COLORS[idx % GRAPH_COLORS.length];
};

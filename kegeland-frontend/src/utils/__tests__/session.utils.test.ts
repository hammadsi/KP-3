import moment from 'moment';

import { sessionMock } from '../../components/mocks/sessions.mock';
import {
  getLastSessionTimeDelta,
  getNumSessionsThisWeek,
  groupByWeek,
} from '../session.utils';

describe('Test sesison utils', () => {
  it('groupByWeek should return currenct week and 0', () => {
    const currWeek = moment().week();
    const state = groupByWeek([sessionMock], 1);
    expect(state).toEqual({ [currWeek]: 0 });
  });

  it('getNumSessionsThisWeek should return undefined', () => {
    const index = getNumSessionsThisWeek([sessionMock]);
    expect(index).toEqual(0);
  });

  it('getLastSessionTimeDelta should return', () => {
    const size = getLastSessionTimeDelta([]);
    expect(size).toEqual(0);
  });
});

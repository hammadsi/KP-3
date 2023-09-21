import { matchRouteDefinitions } from '../breadcrumb.utils';
import routes from '../../routes';
import {
  routePathLoginMock,
  routePathPatientPatientIdMock,
} from '../mocks/breadcrumb.mock';

describe('Test breadcrum utils', () => {
  it('extractReuteParam should return routepath for login', () => {
    const matches = matchRouteDefinitions(routes, '/login');
    expect(matches).toEqual([routePathLoginMock]);
  });

  it('extractReuteParam should return routepath for patient', () => {
    const matches = matchRouteDefinitions(routes, '/patients/patientId');
    expect(matches).toEqual([routePathPatientPatientIdMock]);
  });

  it('extractReuteParam should return routepath for emty list', () => {
    const matches = matchRouteDefinitions(routes, 'hello');
    expect(matches).toEqual([]);
  });
});

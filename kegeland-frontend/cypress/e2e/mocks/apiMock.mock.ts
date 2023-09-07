import loginResponseMock from '../../../src/state/ducks/auth/mocks/loginResponse.mock';
import refreshResponseMock from '../../../src/state/ducks/auth/mocks/refreshResponse.mock';
import fetchPatentByIdResponse from '../../../src/state/ducks/patients/mocks/fetchPatientByIdResponse.mock';
import fetchPatentsResponseMock from '../../../src/state/ducks/patients/mocks/fetchPatientsRespnse.mock';
import questionnairesResponce from '../../../src/state/ducks/questionnaires/mocks/questionnairesResponse.mock';
import answerResponce from '../../../src/state/ducks/questionnaires/mocks/answerResponse.mock';
import { sensorFemfitRespose } from '../../../src/state/ducks/sensors/mocks/sensorsResponse.mock';
import sessionByIdResponce from '../../../src/state/ducks/sessions/mocks/sessionByIdResponce.mock';
import sessionsresponce from '../../../src/state/ducks/sessions/mocks/sessionsResponce.mock';

export const apiMock = () => {
  cy.intercept(
    {
      method: 'POST',
      url: '/api/auth/login',
    },
    {
      body: loginResponseMock,
    },
  );
  cy.intercept(
    {
      method: 'POST',
      url: '/api/auth/refresh',
    },
    {
      body: refreshResponseMock,
    },
  );
  cy.intercept(
    {
      method: 'POST',
      url: '/api/auth/logout',
    },
    {},
  );
  cy.intercept(
    {
      method: 'GET',
      url: '/api/users/uid',
    },
    {
      body: fetchPatentByIdResponse,
    },
  );
  cy.intercept(
    {
      method: 'GET',
      url: '/api/users/patients',
    },
    {
      body: fetchPatentsResponseMock,
    },
  );
  cy.intercept(
    {
      method: 'Get',
      url: '/api/questionnaires/assignments/uid',
    },
    { body: questionnairesResponce },
  );
  cy.intercept(
    {
      method: 'Get',
      url: '/api/questionnaires/qid/answers',
    },
    {
      body: answerResponce,
    },
  );
  cy.intercept(
    {
      method: 'GET',
      url: '/api/sensors/femfit',
    },
    {
      body: sensorFemfitRespose,
    },
  );
  cy.intercept(
    {
      method: 'GET',
      url: '/api/sessions/eid',
    },
    { body: sessionByIdResponce },
  );
  cy.intercept(
    {
      method: 'GET',
      url: '/api/sessions?userId=uid',
    },
    {
      body: sessionsresponce,
    },
  );

  cy.intercept(
    {
      method: 'GET',
      url: '/api/users/patients',
    },
    {
      body: fetchPatentsResponseMock,
    },
  );
  cy.intercept(
    {
      method: 'Get',
      url: '/api/questionnaires/assignments/uid',
    },
    { body: questionnairesResponce },
  );
};

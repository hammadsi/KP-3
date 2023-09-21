import loginResponseMock from '../../src/state/ducks/auth/mocks/loginResponse.mock';
import refreshResponseMock from '../../src/state/ducks/auth/mocks/refreshResponse.mock';
import { apiMock } from './mocks/apiMock.mock';

describe('Login test', () => {
  it('succsessfully load login page"', () => {
    apiMock();

    cy.visit('/');
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/login');
    });
  });

  it('should display Email not valid', () => {
    apiMock();

    cy.get('input[name=email]').type('ola.nordmann@gmail');
    cy.get('input[name=password]').type(`passord {enter}`);

    cy.contains('Email is not valid');
  });

  it('should login and load patientList page ', () => {
    apiMock();

    cy.get('input[name=email]').type('.com');
    cy.get('input[name=password]').type(`passord {enter}`);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
  });
  it('should logout and load login page ', () => {
    apiMock();

    cy.get('button[type=button]').contains('Sign out').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/login');
    });
  });
});

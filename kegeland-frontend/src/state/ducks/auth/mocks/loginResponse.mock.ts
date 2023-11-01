import { LoginResponse, PatientType, UserRole } from '../auth.interface';

const loginResponseMock: LoginResponse = {
  id: 'uid3',
  email: 'ola.nordmann@gmail.org',
  details: {
    roles: [UserRole.PATIENT],
    patientType: [PatientType.WHEELCHAIR],
    name: {
      lastName: 'Nordmann',
      firstName: 'Ola',
    },
  },
  tokens: {
    accessToken: 'access',
    idToken: 'id',
    refreshToken: 'refresh',
    expiresIn: 3600,
  },
};

export default loginResponseMock;

import {UserRole} from '~constants/auth';

import {
  AuthTokens,
  LoginDTO,
  LoginResponse,
  RegisterDTO,
} from '../auth/auth.interface';
import {initialState} from '../auth/auth.reducer';

const loginResponse: LoginResponse = {
  id: 'oaijdoqwdjfwou',
  email: 'ola.nordmann@gmail.com',
  details: {
    roles: [UserRole.PATIENT],
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

export const signInCredentials: LoginDTO = {
  email: loginResponse.email,
  password: '1234567',
};

export const signUpCredentials: RegisterDTO = {
  email: loginResponse.email,
  name: loginResponse.details.name,
  roles: loginResponse.details.roles,
  password: '1234567',
};

export const signedInState = {
  ...initialState,
  isSignedIn: true,
  authUser: {id: loginResponse.id, email: loginResponse.email},
  userDetails: loginResponse.details,
};

export const mockTokens: AuthTokens = {
  accessToken: 'adfsad',
  idToken: 'adfsad',
  refreshToken: 'adfsloijsapAKODSo',
  expiresIn: 1232131,
};

export default loginResponse;

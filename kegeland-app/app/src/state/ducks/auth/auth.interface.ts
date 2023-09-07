import {UserRole} from '~constants/auth';

export type AuthTokens = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type UserDetails = {
  name: {
    firstName: string;
    lastName: string;
  };
  roles: UserRole[];
};

export interface AuthState {
  ready: boolean;
  loading: boolean;
  isSignedIn: boolean;
  authUser?: {
    id: string;
    email: string;
  };
  userDetails?: UserDetails;
  error?: string;
}

export type LoginDTO = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: string;
  email: string;
  details: UserDetails;
  tokens: AuthTokens;
};

export type RegisterDTO = LoginDTO & UserDetails;

export type RegisterResponse = LoginResponse;

export type ResetPasswordDTO = Pick<LoginDTO, 'email'>;

export type RefreshResponse = AuthTokens;

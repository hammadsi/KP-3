import { WheelchairPatient } from '../wheelchairPatients/wheelchairPatients.interface';

export enum UserRole {
  PATIENT = 'patient',
  PHYSICIAN = 'physician',
}

export enum PatientType {
  WHEELCHAIR = 'wheelchair',
  FEMFIT = 'femfit',
}

export type AuthTokens = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type Name = {
  firstName: string;
  lastName: string;
};

export type UserDetails = {
  name: Name;
  roles: UserRole[];
  patientType: PatientType[];
};

export type User = { id: string; email: string } & UserDetails;

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

export type RegisterDTO = LoginDTO &
  UserDetails & {
    wheelchairPatient: WheelchairPatient;
  };

export type RegisterResponse = LoginResponse & {
  wheelchairPatient: WheelchairPatient;
};

export type ResetPasswordDTO = Pick<LoginDTO, 'email'>;

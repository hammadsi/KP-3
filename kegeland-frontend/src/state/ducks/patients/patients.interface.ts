import { User } from '../auth/auth.interface';

export type Patient = User;

export type PatientsState = {
  loading: boolean;
  patient: Patient | undefined;
  data: Patient[];
  error: string | undefined;
};

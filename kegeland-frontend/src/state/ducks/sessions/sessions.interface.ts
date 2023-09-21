import { SensorType } from '../sensors/sensors.interface';

export type SessionDataPoint = number | null;

export type LeanSession = {
  id: string;
  userId: string;
  sensor: SensorType;
  createdAt: number;
};

export interface Session extends LeanSession {
  data: Record<string, SessionDataPoint[]>;
}

export type SessionsState = {
  loading: boolean;
  session: Session | undefined;
  data: Session[];
  error: string | undefined;
};

export type FetchSessionsDto = {
  sensor?: SensorType;
  userId?: string;
};

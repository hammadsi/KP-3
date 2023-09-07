import {DeviceType} from '~constants/bluetooth';

export type ExerciseSession = {
  id?: string;
  sensor: DeviceType;
  data: Record<number, number[]>;
};

export interface SessionState {
  loading: boolean;
  error?: string;
  currentSession: ExerciseSession | undefined;
}

export type UploadSessionDto = {userId: string} & ExerciseSession;
export type UploadSessionResponse = UploadSessionDto & {id: string};

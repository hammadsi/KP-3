import { SensorType } from '../../state/ducks/sensors/sensors.interface';
import { Session } from '../../state/ducks/sessions/sessions.interface';

export const session1 = {
  id: 'id',
  userId: 'userId',
  sensor: SensorType.FEMFIT,
  createdAt: 1235522,
};

export const sessionMock: Session = {
  ...session1,
  data: { '1233': [1, 2, 3], '132': [1, 2, 3] },
};

export const sessionsMock: Session[] = [sessionMock, sessionMock];

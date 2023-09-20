import { SensorType } from '../../sensors/sensors.interface';
import { Session } from '../sessions.interface';

const sessionByIdResponce: Session = {
  id: 'eis',
  userId: 'uid',
  sensor: SensorType.FEMFIT,
  createdAt: 12345678910,
  data: {
    '123456': [1, 2, 3, 4],
    '130000': [1, 3, 4, 5],
    '130001': [5, 6, 7, 8],
    '130010': [9, 10, 11, 12],
    '130015': [13, 14, 15, 16],
  },
};

export default sessionByIdResponce;

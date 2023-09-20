import { SensorType } from '../../state/ducks/sensors/sensors.interface';

export const questionnaire = {
  id: 'qid',
  name: 'test questionnaire',
  sensor: SensorType.EMPATICA,
  questions: [
    {
      maxVal: 'very good',
      minVal: 'not good',
      question: 'how Happy are you',
    },
  ],
};

import { SensorType } from '../../sensors/sensors.interface';
import { Questionnaire } from '../questionnaires.interface';

const questionnairesResponce: Questionnaire = {
  id: 'qid',
  name: 'Test questionnaire',
  sensor: SensorType.FEMFIT,
  questions: [
    {
      minVal: 'Not very good',
      question: 'How do you feel?',
      maxVal: 'Very good',
    },
    {
      minVal: 'I hate dogs',
      question: 'Do you like dogs?',
      maxVal: 'I love dogs',
    },
  ],
};

export default questionnairesResponce;

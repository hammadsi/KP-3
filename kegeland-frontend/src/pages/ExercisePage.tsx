import { useParams } from 'react-router-dom';

import Card from '../components/Card';
import ExerciseGraph from '../components/ExerciseGraph';
import QuestionnaireResults from '../components/QuestionnaireResults';
import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';
import useExercise from '../hooks/useExercise';

type ExercisePageParams = {
  patientId: string;
  exerciseId: string;
};

const ExercisePage: React.FC = () => {
  const { patientId, exerciseId } = useParams<ExercisePageParams>();
  const { answers, questionnaire, sensor, session, loading } = useExercise(
    patientId!,
    exerciseId!,
  );

  return (
    <>
      <Card loading={loading} minH="lg">
        {sensor && session && (
          <ExerciseGraph sensor={sensor!} session={session!} />
        )}
      </Card>

      <Card loading={loading} h="100%">
        <QuestionnaireResults answers={answers} questionnaire={questionnaire} />
      </Card>
    </>
  );
};

export default withLayout(withSpinner(ExercisePage, 300));

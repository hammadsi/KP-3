import { useParams } from 'react-router-dom';
import { Button, Collapse } from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

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

const WheelChairPage: React.FC = () => {
  const patientId = "2P9gfi0u1foJiyoK3ovJ";
  const exerciseId = "28ceabH5I9zm1BguEbcB";

  const { answers, questionnaire, sensor, session, loading } = useExercise(
    patientId!,
    exerciseId!,
  );
  const [visible, setVisible] = useState(false);


  return (
    <>
      <Card loading={loading} minH="lg">
        {sensor && session && (
          <ExerciseGraph sensor={sensor!} session={session!} />
        )}
      </Card>
      <Button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? <ArrowUpIcon /> : <ArrowDownIcon />}
        {visible
          ? '  Hide questionnaire results'
          : '  Show questionnaire results'}
      </Button>
      <Collapse in={visible}>
        <Card loading={loading} h="100%">
          <QuestionnaireResults
            answers={answers}
            questionnaire={questionnaire}
          />
        </Card>
      </Collapse>
    </>
  );
};

export default withLayout(withSpinner(WheelChairPage, 300));

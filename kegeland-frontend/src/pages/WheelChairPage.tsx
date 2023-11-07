import { Button, Collapse } from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

import Card from '../components/Card';
import Graph from '../components/Graph';
import QuestionnaireResults from '../components/QuestionnaireResultsWheelchair';
import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';
import useExercise from '../hooks/useExercise';
import useWheelchairPatient from '../hooks/useWheelchairPatient';

type ExercisePageParams = {
  patientId: string;
  exerciseId: string;
};

const WheelChairPage: React.FC = () => {
  // const patientId = "2P9gfi0u1foJiyoK3ovJ";
  // const exerciseId = "28ceabH5I9zm1BguEbcB";

  const patientId = 'Wwy4sqcl7dYGvvkHA5mmdWBEa713';
  const exerciseId = 'DtSmNvXL12fzoYdQFmCE';

  const { wheelchairPatient } = useWheelchairPatient(patientId);
  let gameSession;
  if (wheelchairPatient) {
    gameSession = wheelchairPatient!.gameSessions.find(
      (session) => session.id === exerciseId,
    );
  }

  const { sensor, session, loading } = useExercise(patientId!, exerciseId!);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card loading={loading} minH="lg">
        {sensor && session && <Graph session={gameSession} />}
      </Card>
      <Button
        onClick={() => {
          setVisible(!visible);
        }}>
        {visible ? <ArrowUpIcon /> : <ArrowDownIcon />}
        {visible
          ? '  Hide questionnaire results'
          : '  Show questionnaire results'}
      </Button>
      <Collapse in={visible}>
        <Card loading={loading} h="100%">
          <QuestionnaireResults questionnaire={gameSession?.questionnaires} />
        </Card>
      </Collapse>
    </>
  );
};

export default withLayout(withSpinner(WheelChairPage, 300));

import { Button, Box, Flex, Stack, useMediaQuery, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import {
  AiOutlineClockCircle,
  AiOutlineStock,
  AiOutlineCalendar,
} from 'react-icons/ai';

import Card from '../components/Card';
import LabeledValue from '../components/LabeledValue';
import withLayout from '../hoc/withLayout';
import usePatient from '../hooks/usePatient';
import WeeklySessionsChart from '../components/WeeklySessionsChart';
import ExerciseTable from '../components/ExerciseTable';
import withSpinner from '../hoc/withSpinner';

type PatientPageParams = {
  patientId: string;
};

const PatientPage: React.FC = () => {
  const [isGreaterThanLg] = useMediaQuery('(min-width: 62em)');
  const { patientId } = useParams<PatientPageParams>();
  const { data, details, loading } = usePatient(patientId || '');

  const headingStyle = {
    color: 'var(--chakra-colors-blackAlpha-800)',
    fontWeight: 'bold',
    fontSize: '24px',
    margin: '25px 0 10px 0',
  };

  const startUnitySession = () => {
    // Open the Unity game using the custom URI scheme
    window.location.href = `VRWheelchairSim:// -patientID ${patientId} -bearerToken ${localStorage.getItem('id_token')}`;
  };

  return (
    <Box w="100%" h="100%">
      <Flex
        flexDirection={isGreaterThanLg ? 'row' : 'column'}
        flexBasis="100%"
        flexWrap="nowrap">
        <Card
          marginRight={5}
          w={isGreaterThanLg ? '25%' : '100%'}
          minH={isGreaterThanLg ? 'md' : undefined}
          loading={loading}>
          <Stack
            spacing={4}
            direction={isGreaterThanLg ? 'column' : 'row'}
            w="100%"
            alignItems="flex-start">
            <LabeledValue
              label="Workouts this week"
              value={details.sessionsThisWeek}
              icon={AiOutlineCalendar}
            />
            <LabeledValue
              label="Since last exercise"
              value={details.lastSessionDelta}
              icon={AiOutlineClockCircle}
            />
            <LabeledValue
              label="Total workouts"
              value={details.sessionsTotal}
              icon={AiOutlineStock}
            />
          </Stack>
        </Card>
        <Card
          w={isGreaterThanLg ? '75%' : '100%'}
          minH={isGreaterThanLg ? 'md' : undefined}
          loading={loading}>
          <WeeklySessionsChart sessions={data} numWeeks={12} />
        </Card>
      </Flex>
      <h1 style={headingStyle}>OVERVIEW OF THE PATIENT'S EXERCISES</h1>
      <Card loading={loading} minH="36">
        <ExerciseTable sessions={data} patientId={patientId!} />
      </Card>
      <Button w="100%" marginTop={8} onClick={startUnitySession}>
        Start session
      </Button>
    </Box>
    
  );
};

export default withLayout(withSpinner(PatientPage));

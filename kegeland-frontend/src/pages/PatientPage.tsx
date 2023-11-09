import React, { useState } from 'react';
import {
  Button,
  Box,
  Flex,
  Stack,
  useMediaQuery,
  Center,
  Collapse,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import {
  AiOutlineClockCircle,
  AiOutlineStock,
  AiOutlineCalendar,
} from 'react-icons/ai';
import { useSelector } from 'react-redux';

import Card from '../components/Card';
import LabeledValue from '../components/LabeledValue';
import withLayout from '../hoc/withLayout';
import usePatient from '../hooks/usePatient';
import WeeklySessionsChart from '../components/WeeklySessionsChart';
import withSpinner from '../hoc/withSpinner';
import useAppSelector from '../hooks/useAppSelector';
import { PatientType, UserRole } from '../state/ducks/auth/auth.interface';
import FemfitExerciseTable from '../components/FemfitExerciseTable';
import WheelchairExerciseTable from '../components/WheelchairExerciseTable';
import { RootState } from '../state/store';
import useWheelchairPatient from '../hooks/useWheelchairPatient';
import { ViewSession } from '../state/ducks/sessions/sessions.interface';
import useUserDetails from '../hooks/useUserDetails';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import QuestionnaireResults from '../components/QuestionnaireResultsWheelchair';

type PatientPageParams = {
  patientId: string;
};

const PatientPage: React.FC = () => {
  const [isGreaterThanLg] = useMediaQuery('(min-width: 62em)');
  const { patientId } = useParams<PatientPageParams>();
  const { data, details: femfitDetails, loading } = usePatient(patientId || '');
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { userDetails } = useAppSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  // Determine the user's role
  const userRole = userDetails?.roles.includes(UserRole.PHYSICIAN)
    ? UserRole.PHYSICIAN
    : UserRole.PATIENT;
  const userIdToUse = userRole === UserRole.PATIENT ? authUser?.id : patientId;
  const userDetailsForPatient = useUserDetails(patientId);
  const patientType = userDetails?.patientType;
  const { gameSessions, details: wheelchairDetails, wheelchairPatient } =
    useWheelchairPatient(userIdToUse);

  const sortedGameSessions = [...gameSessions].sort(
    (a, b) => b.createdAt - a.createdAt,
  );
  const sortedData = [...data].sort((a, b) => b.createdAt - a.createdAt);

  const allSessions: ViewSession[] = [...sortedData, ...sortedGameSessions];
  const headingStyle = {
    color: 'var(--chakra-colors-blackAlpha-800)',
    fontWeight: 'bold',
    fontSize: '24px',
    margin: '25px 0 10px 0',
  };

  const startUnitySession = () => {
    window.location.href = `VRWheelchairSim:// -patientID ${patientId} -bearerToken ${localStorage.getItem(
      'id_token',
    )}`;
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
              value={
                femfitDetails.sessionsThisWeek +
                wheelchairDetails.sessionsThisWeek
              }
              icon={AiOutlineCalendar}
            />
            {/* TODO: Only show the one relevant for patient type */}
            <LabeledValue
              label="Since last femfit exercise"
              value={femfitDetails.lastSessionDelta}
              icon={AiOutlineClockCircle}
            />
            <LabeledValue
              label="Since last wheelchair exercise"
              value={wheelchairDetails.lastSessionDelta}
              icon={AiOutlineClockCircle}
            />
            <LabeledValue
              label="Total workouts"
              value={
                femfitDetails.sessionsTotal + wheelchairDetails.sessionsTotal
              }
              icon={AiOutlineStock}
            />
          </Stack>
        </Card>
        <Card
          w={isGreaterThanLg ? '75%' : '100%'}
          minH={isGreaterThanLg ? 'md' : undefined}
          loading={loading}>
          <WeeklySessionsChart sessions={allSessions} numWeeks={12} />
        </Card>
      </Flex>

      {((userRole === UserRole.PATIENT &&
        patientType?.includes(PatientType.FEMFIT)) ||
        (userRole === UserRole.PHYSICIAN &&
          userDetailsForPatient.patient?.patientType.includes(
            PatientType.FEMFIT,
          ))) && (
        <div>
          <h1 style={headingStyle}>Overview of Femfit exercises</h1>
          <Card loading={loading} minH="36">
            <FemfitExerciseTable
              sessions={sortedData}
              patientId={userIdToUse!}
            />
          </Card>
        </div>
      )}
      {((userRole === UserRole.PATIENT &&
        patientType?.includes(PatientType.WHEELCHAIR)) ||
        (userRole === UserRole.PHYSICIAN &&
          userDetailsForPatient.patient?.patientType.includes(
            PatientType.WHEELCHAIR,
          ))) && (
        <div>
          <h1 style={headingStyle}>Overview of Wheelchair exercises</h1>
          <Card loading={loading} minH="36">
            <WheelchairExerciseTable
              sessions={sortedGameSessions}
              patientId={userIdToUse!}
            />
          </Card>
        </div>
      )}
      <Button
        w="100%"
        onClick={() => {
          setVisible(!visible);
        }}>
        {visible ? <ArrowUpIcon /> : <ArrowDownIcon />}
        {visible
          ? '  Hide questionnaire results'
          : '  Show questionnaire results'}
      </Button>
      <Collapse in={visible}>
        <Card h="100%">
          <QuestionnaireResults questionnaire={wheelchairPatient?.currentPhysicalState.questionnaire} />
        </Card>
      </Collapse>
      {userDetails?.roles.includes(UserRole.PHYSICIAN) && (
        <Button w="100%" marginTop={8} onClick={startUnitySession}>
          Start session
        </Button>
      )}
    </Box>
  );
};

export default withLayout(withSpinner(PatientPage));

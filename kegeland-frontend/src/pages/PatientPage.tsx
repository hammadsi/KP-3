import React, { useState } from 'react';
import {
  Button,
  Box,
  Flex,
  Stack,
  useMediaQuery,
  Center,
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
import { UserRole } from '../state/ducks/auth/auth.interface';
import FemfitExerciseTable from '../components/FemfitExerciseTable';
import WheelchairExerciseTable from '../components/WheelchairExerciseTable';
import { RootState } from '../state/store';
import useWheelchairPatient from '../hooks/useWheelchairPatient';
import { ViewSession } from '../state/ducks/sessions/sessions.interface';

type PatientPageParams = {
  patientId: string;
};

const PatientPage: React.FC = () => {
  const [isGreaterThanLg] = useMediaQuery('(min-width: 62em)');
  const { patientId } = useParams<PatientPageParams>();
  const { data, details: femfitDetails, loading } = usePatient(patientId || '');
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { gameSessions, details: wheelchairDetails } = useWheelchairPatient(
    authUser?.id,
  );
  const { userDetails } = useAppSelector((state) => state.auth);

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

  // New code for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'done'>('idle');

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const triggerFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const text = event?.target?.result?.toString();
        if (!text) {
          console.error('Could not read file.');
          return;
        }
        const lines = text.split('\n');
        const imuData = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          const parts = line.split(',');

          if (parts.length === 7) {
            const [
              timeStamp,
              x_accel,
              x_gyro,
              y_accel,
              y_gyro,
              z_accel,
              z_gyro,
            ] = parts;
            imuData.push({
              timeStamp: parseFloat(timeStamp),
              x_accel: parseFloat(x_accel),
              x_gyro: parseFloat(x_gyro),
              y_accel: parseFloat(y_accel),
              y_gyro: parseFloat(y_gyro),
              z_accel: parseFloat(z_accel),
              z_gyro: parseFloat(z_gyro),
            });
          }
        }

        console.log('Parsed IMU data:', imuData);
        // TODO: Update the Firestore with Update calls to the API when endpoints are ready.
        setUploadStatus('done');
      };

      reader.onerror = function (event) {
        console.error('An error occurred while reading the file:', event);
        setUploadStatus('idle');
      };

      reader.readAsText(selectedFile);
    }
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
            {/* TODO: Only shpw the one relevant for patient type */}
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

      {/* TODO: Only show the ones relevant for the patient type */}

      <h1 style={headingStyle}>Overview of Femfit exercises</h1>
      <Card loading={loading} minH="36">
        <FemfitExerciseTable sessions={sortedData} patientId={patientId!} />
      </Card>

      <h1 style={headingStyle}>Overview of Wheelchair exercises</h1>
      <Card loading={loading} minH="36">
        <WheelchairExerciseTable
          sessions={sortedGameSessions}
          patientId={patientId!}
        />
      </Card>

      {userDetails?.roles.includes(UserRole.PHYSICIAN) && (
        <Button w="100%" marginTop={8} onClick={startUnitySession}>
          Start session
        </Button>
      )}

      <Center marginTop={4}>
        <input
          type="file"
          id="imuData"
          name="imuData"
          accept=".csv"
          onChange={handleFileSelection}
        />
        <Button
          onClick={triggerFileUpload}
          ml={4}
          isDisabled={!selectedFile}
          colorScheme={uploadStatus === 'done' ? 'green' : 'blue'}>
          {uploadStatus === 'done' ? 'Uploaded' : 'Upload Selected File'}
        </Button>
      </Center>
    </Box>
  );
};

export default withLayout(withSpinner(PatientPage));

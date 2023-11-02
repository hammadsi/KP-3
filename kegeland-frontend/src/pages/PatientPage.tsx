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
import useUploadIMUData from '../hooks/useUploadIMUData';

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
  const { uploadIMUData, loading: imuUploadLoading, error: imuUploadError } = useUploadIMUData();

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
      reader.onload = async function (event) {
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
              timestamp,
              x_accel,
              y_accel,
              z_accel,
              x_gyro,
              y_gyro,
              z_gyro,
            ] = parts.map(part => parseFloat(part));

            imuData.push({
              timestamp: timestamp,
              accelerometer: {
                x: x_accel,
                y: y_accel,
                z: z_accel,
              },
              gyroscope: {
                x: x_gyro,
                y: y_gyro,
                z: z_gyro,
              },
            });
          }
        }

        console.log('Parsed IMU data:', imuData);
        try {
          const patientId = 'Wwy4sqcl7dYGvvkHA5mmdWBEa713';
          const sessionId = 'faDFwwohudvgI5GjBsM9';

          await uploadIMUData(patientId, sessionId, imuData);
          setUploadStatus('done');
        } catch (error) {
          console.error('Error uploading IMU data:', error);
          setUploadStatus('idle');
        }
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


      {/*Move this into the Exercise Session Page when the issue is done */}
      <Card>
        <h2 style={headingStyle}> Upload IMU data for session</h2>
        <Center marginTop={12}>
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
          isDisabled={!selectedFile || imuUploadLoading}
          colorScheme={uploadStatus === 'done' ? 'green' : 'blue'}>
          {uploadStatus === 'done' ? 'Uploaded' : imuUploadLoading ? 'Uploading...' : 'Upload selected IMU Data'}
        </Button>
        {imuUploadError && <p>Error uploading data: {imuUploadError}</p>}
        </Center>
      </Card>
    </Box>
  );
};

export default withLayout(withSpinner(PatientPage));

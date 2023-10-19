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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      const reader = new FileReader();
      reader.onload = function(event) {
        const text = event?.target?.result?.toString();
  
        if (!text) {
          console.error("Could not read file.");
          return;
        }
  
        const lines = text.split('\n');

        // Currently holds the IMU, push it to firestore when API is ready
        const imuData = [];
  
        // Skip the header row
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          const parts = line.split(',');
  
          if (parts.length === 7) {
            const [timeStamp, x_accel, x_gyro, y_accel, y_gyro, z_accel, z_gyro] = parts;
            imuData.push({
              timeStamp: parseFloat(timeStamp),
              x_accel: parseFloat(x_accel),
              x_gyro: parseFloat(x_gyro),
              y_accel: parseFloat(y_accel),
              y_gyro: parseFloat(y_gyro),
              z_accel: parseFloat(z_accel),
              z_gyro: parseFloat(z_gyro)
            });
          }
        }
  
        console.log("Parsed IMU data:", imuData);
        // TODO: Update the Firestore with Update calls to the API when endpoints are ready.
      };
  
      reader.onerror = function(event) {
        console.error("An error occurred while reading the file:", event);
      };
  
      reader.readAsText(file);
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
      <Center marginTop={4}>
        <input
          type="file"
          id="imuData"
          name="imuData"
          accept=".csv"
          onChange={handleFileUpload}
        />
        <label htmlFor="imuData">Upload IMU Data (CSV)</label>
      </Center>
    </Box>
  );
};

export default withLayout(withSpinner(PatientPage));

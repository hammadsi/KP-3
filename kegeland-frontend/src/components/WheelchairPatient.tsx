import React, { FC } from 'react';
import { Box, Text, Spinner } from '@chakra-ui/react';
import useWheelchairPatient from '../hooks/useWheelchairPatient';

type WheelchairPatientProps = {
  id: string;
};

const WheelchairPatientComponent: FC<WheelchairPatientProps> = ({ id }) => {
  const { wheelchairPatient, loading, error } = useWheelchairPatient(id);

  if (loading) {
    return (
      <Box p="4" textAlign="center">
        <Spinner />
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (error || !wheelchairPatient) {
    return (
      <Box p="4" textAlign="center">
        <Text color="red.500">Error fetching patient data.</Text>
      </Box>
    );
  }

  return (
    <Box p="4">
      <Text fontWeight="bold">Patient Details:</Text>
      <Text>ID: {wheelchairPatient.patientId}</Text>
      {/* Additional details can be added here as needed */}
    </Box>
  );
};

export default WheelchairPatientComponent;

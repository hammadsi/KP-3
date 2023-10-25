import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';

import useAddEmptyGameSession from '../hooks/useAddEmptyGameSession';
import useUpdateGameSession from '../hooks/useUpdateGameSession';
import useWheelchairPatient from '../hooks/useWheelchairPatient';

import { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import { WheelchairPatient } from '../state/ducks/wheelchairPatients/wheelchairPatients.interface';

const mockWheelchairPatient: WheelchairPatient = {
  id: '2P9gfi0u1foJiyoK3ovJ',
  name: 'John Doe',
  birthdate: '1990-01-01',
  gender: 'M',
  currentPhysicalState: {
    height: 175, // in cm
    weight: 70, // in kg
    maxHeartRate: 180,
    averageHeartRate: 75,
    maxWheelchairSpeed: 15, // in km/h
    averageWheelchairSpeed: 7.5,
  },
  gameSessions: [
    {
      sessionId: '28ceabH5I9zm1BguEbcB',
      startTime: new Date(),
      endTime: new Date(),
      exerciseTime: 3600, // in seconds
      questionaires: {
        preGame: [],
        postGame: [],
      },
      laps: [
        {
          lapTime: 40, // in seconds
          timestamp: new Date('2023-10-18T12:20:00'),
        },
        {
          lapTime: 60, // in seconds
          timestamp: new Date('2023-10-18T12:25:00'),
        },
        {
          lapTime: 80, // in seconds
          timestamp: new Date('2023-10-18T12:30:00'),
        },
      ],
      timeSeriesData: {
        heartRates: [
          {
            heartRate: 70,
            timestamp: new Date('2023-10-18T12:10:00'),
          },
          {
            heartRate: 75,
            timestamp: new Date('2023-10-18T12:10:00'),
          },
          {
            heartRate: 80,
            timestamp: new Date('2023-10-18T12:10:00'),
          },
        ],
        speeds: [
          {
            leftSpeed: 7,
            rightSpeed: 7,
            timestamp: new Date('2023-10-18T12:10:00'),
          },
        ],
        imus: [
          // Add your IMUData mock here
        ],
      },
    },
  ],
};

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { updateSession } = useUpdateGameSession();
  const { addGameSession, loading, error } = useAddEmptyGameSession();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { wheelchairPatient } = useWheelchairPatient(
    authUser?.id,
  );


  const handleStartSession = () => {
    try {
      if (authUser) {
        // Create a new game session first
        addGameSession(authUser.id);
      }

      const { wheelchairPatient } = useWheelchairPatient(
        authUser?.id,
      );
      
      const currentWheelchairPatient = wheelchairPatient;

      if (currentWheelchairPatient)
        console.log('wheelchairPatient', currentWheelchairPatient.gameSessions);
      else
        console.log('currentWheelchairPatient undefined');


      // Get the latest game session (last in the array) to update it
      if (wheelchairPatient && wheelchairPatient.gameSessions) {
        const latestSession = wheelchairPatient.gameSessions[wheelchairPatient.gameSessions.length - 1];

        if (latestSession && authUser) {
          // Update the session with mock data
          updateSession({
            patientId: authUser.id,
            sessionId: latestSession.sessionId,
            sessionData: mockWheelchairPatient.gameSessions[0],
          });
        } else {
          console.error('No game sessions found');
        }
      } else {
        console.error('No wheelchair patient found');
      }

      navigate('/game/pre');
    } catch (error) {
      console.error('Error while starting the game session:', error);
    }
  };
  return (
    <Center>
      <Flex
        flexDirection="column"

        justifyContent="center"
        alignItems="center"
        textAlign="center">
        <Text
          fontSize={26}
          fontWeight="semibold"
          color="gray.600"
          marginTop={8}>
          Welcome to THE GAME.
        </Text>
        <Text fontSize={20} fontWeight="semibold" color="gray.600" margin={8}>
          To start the session, click on the button below
        </Text>
        <Button size="lg" onClick={handleStartSession}>
          Start session
        </Button>
        {error && <Text color="red.500">{error}</Text>}
      </Flex>
    </Center>
  );
};

export default withLayout(withSpinner(GamePage));

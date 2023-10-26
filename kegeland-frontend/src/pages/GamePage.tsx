import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';

import useAddEmptyGameSession from '../hooks/useAddEmptyGameSession';
import useUpdateGameSession from '../hooks/useUpdateGameSession';

import { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import { GameSessionData } from '../state/ducks/wheelchairPatients/wheelchairPatients.interface';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { addGameSession, loading, error } = useAddEmptyGameSession();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { updateSession } = useUpdateGameSession();

  const handleStartSession = async () => {
    try {
      if (authUser) {
        // Create a new game session first
        const sessionId = await addGameSession(authUser?.id);
        console.log('Session id', sessionId)

        // Default payload for the game session
        const defaultSessionData = {
          startTime: new Date(), // Using the current time as the default
          endTime: new Date(), // You can adjust this according to your needs
          exerciseTime: 0, // Default exercise time
          questionnaires: {
            preGame: [], // Empty array for pre-game questions
            postGame: [], // Empty array for post-game questions
          }, // Empty array for questionnaires
          laps: [], // Empty array for laps
          timeSeriesData: {
            heartRates: [],
            speeds: [],
            imus: [],
            // Include other fields like IMUData if necessary
          }
        } as GameSessionData;

        if (sessionId) {
          await updateSession({
            patientId: authUser!.id, // Assuming authUser.id is the patient ID
            sessionId: sessionId,
            sessionData: defaultSessionData
          });
        } else {
          console.error("Session ID is null.");
          // Handle the error state appropriately
        }

        navigate('/game/pre', { state: { sessionId } });
      }
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

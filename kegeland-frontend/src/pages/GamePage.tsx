import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';

import useAddEmptyGameSession from '../hooks/useAddEmptyGameSession';

import { RootState } from '../state/store';
import { useSelector } from 'react-redux';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { addGameSession, loading, error } = useAddEmptyGameSession();
  const { authUser } = useSelector((state: RootState) => state.auth);

  const handleStartSession = async () => {
    try {
      if (authUser) {
        // Create a new game session first
        const sessionId = await addGameSession(authUser?.id);
        console.log('Session id', sessionId)
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

import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';

const GamePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartSession = () => {
    navigate('/game/pre');
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
      </Flex>
    </Center>
  );
};

export default withLayout(withSpinner(GamePage));

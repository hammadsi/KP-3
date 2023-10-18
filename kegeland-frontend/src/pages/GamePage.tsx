import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  Wrap,
  WrapItem,
  useMediaQuery,
} from '@chakra-ui/react';

import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';
import QuestionnairePage from './QuestionnairePage';
import { useState } from 'react';
import session from 'redux-persist/lib/storage/session';

const GamePage: React.FC = () => {
  const [sessionStarted, setSessionStarted] = useState(false);

  const handleStartSession = () => {
    setSessionStarted(true);
  }
  return (
    <Center>
     {sessionStarted ? (
        <QuestionnairePage />
      ) : (
        <Flex 
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Text fontSize={26} fontWeight="semibold" color="gray.600" marginTop={8}>
            Welcome to THE GAME. 
          </Text>
          <Text fontSize={20} fontWeight="semibold" color="gray.600" margin={8}>
            To start the session, click on the button below
          </Text>
          <Button size="lg" onClick={handleStartSession}>
            Start session
          </Button>
        </Flex>
      )}
    </Center>
  );
};

export default withLayout(withSpinner(GamePage));

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Flex
      w="60wv"
      h="80vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexDirection="column">
      <Text fontSize={26} fontWeight="semibold" color="gray.600">
        Questionnaire Title
      </Text>

      {/* Insert questionnaire here */}

      <Box>
        <Button marginTop={8} onClick={() => navigate('/')}>
          Start session
        </Button>
      </Box>
    </Flex>
  );
};

export default QuestionnairePage;

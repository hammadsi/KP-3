import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexDirection="column">
      <Heading fontSize="9xl" as="h1" color="gray.700">
        404
      </Heading>
      <Text fontSize={26} fontWeight="semibold" color="gray.600">
        Oops, this page could not be found!
      </Text>

      <Box>
        <Button marginTop={8} onClick={() => navigate('/')}>
          Go back
        </Button>
      </Box>
    </Flex>
  );
};

export default NotFoundPage;

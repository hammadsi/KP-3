import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdConstruction } from 'react-icons/md';
const NotImplemented: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexDirection="column">
      <Heading fontSize="9xl" as="h1">
        <Wrap align="center" color="gray.700">
          <WrapItem>
            <MdConstruction />
          </WrapItem>
          <WrapItem>501</WrapItem>
        </Wrap>
      </Heading>
      <Text fontSize={26} fontWeight="semibold" color="gray.600">
        This page is a planned feature in the future.
      </Text>

      <Box>
        <Button marginTop={8} onClick={() => navigate('/')}>
          Go back
        </Button>
      </Box>
    </Flex>
  );
};

export default NotImplemented;

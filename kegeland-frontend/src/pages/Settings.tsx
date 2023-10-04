import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Wrap,
  WrapItem,
  useMediaQuery,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdConstruction } from 'react-icons/md';

import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Flex
      w="60wv"
      h="80vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexDirection="column"
    >
      <Heading fontSize="9xl" as="h1">
        <Wrap align="center" color="gray.700">
          <WrapItem>
            <MdConstruction />
          </WrapItem>
          <WrapItem>501</WrapItem>
        </Wrap>
      </Heading>
      <Text fontSize={26} fontWeight="semibold" color="gray.600">
        Settings is a planned feature in the future.
      </Text>

      <Box>
        <Button marginTop={8} onClick={() => navigate('/')}>
          Go back
        </Button>
      </Box>
    </Flex>
  );
};

export default withLayout(withSpinner(Settings));

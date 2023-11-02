import {
  Flex,
  Avatar,
  Stack,
  Heading,
  Button,
  WrapItem,
  Link,
} from '@chakra-ui/react';

interface PatientProps {
  name: string;
  id: string;
}

const Patient: React.FC<PatientProps> = ({ name, id }) => {
  return (
    <WrapItem
      maxW={'270px'}
      w={'full'}
      boxShadow={'md'}
      rounded={'md'}
      overflow={'wrap'}
      justifyContent="center"
    >
      <Flex p={6} direction="column" alignItems="center">
        <Avatar />
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {name}
          </Heading>
        </Stack>
        <Link href={'/patient/' + id}>
          <Button
            w={'full'}
            rounded={'md'}
            bgColor={'blue.200'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 's',
              borderColor: 'black',
              borderWidth: '2px',
            }}
          >
            Show profile
          </Button>
        </Link>
      </Flex>
    </WrapItem>
  );
};

export default Patient;

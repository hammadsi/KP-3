import {
  Box,
  Text,
  WrapItem,
  Divider,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

interface ExerciseProps {
  date: string;
  id: string;
  sensor: string;
}

const Exercise: React.FC<ExerciseProps> = ({ date, id, sensor }) => {
  const { patientId } = useParams();

  return (
    <WrapItem>
      <LinkBox
        w="500px"
        p={['12', '12']}
        bg="gray.100"
        borderRadius={20}
        pb="4">
        <LinkOverlay
          href={'/patient/' + patientId + '/exercise/' + id}
          display="flex-center"
          justifyContent="space-between">
          <Box>{date}</Box>
          <Box>{sensor}</Box>
        </LinkOverlay>
        <Divider orientation="horizontal" borderColor={'blue.900'} />
        <Text fontSize="lg" mb="4"></Text>
      </LinkBox>
    </WrapItem>
  );
};

export default Exercise;

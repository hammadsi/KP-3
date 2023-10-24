import { Box, Button, Flex, Text } from '@chakra-ui/react';

const QuestionnairePage: React.FC = () => {
  // const navigate = useNavigate();
  // const { patientId, exerciseId } = useParams<ExercisePageParams>();

  const startUnitySession = () => {
    // Open the Unity game using the custom URI scheme
    window.location.href = `VRWheelchairSim://`;
  };

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
        <Button marginTop={8} onClick={startUnitySession}>
          Start session
        </Button>
      </Box>
    </Flex>
  );
};

export default QuestionnairePage;

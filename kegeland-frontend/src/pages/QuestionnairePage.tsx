import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import SliderElement from '../components/SliderElement';

type ExercisePageParams = {
  patientId: string;
  exerciseId: string;
};

const QuestionnairePage: React.FC = () => {
  // const navigate = useNavigate();
  // const { patientId, exerciseId } = useParams<ExercisePageParams>();
  {/* Insert GET to get the questionnaire based on sessionID and sensor */}

  const startUnitySession = () => {
    // Open the Unity game using the custom URI scheme
    window.location.href = `VRWheelchairSim://`;
    {/* Insert PUT here to send answers to questionnaire based on sessionID and userID */}
  };

  return (
    <Flex
      w="60wv"
      h="80vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexDirection="column">
      <Text fontSize={26} fontWeight="semibold" color="gray.600" marginBottom="50px">
        Pre-Questionnaire {/* Insert name here */}
      </Text>

      {/* Insert questionnaire here. */}
      <Card minW="lg" padding="20px">
        <Text fontSize={16} fontWeight="semibold" color="gray.600">
          How are you feeling? {/* Insert question here */}
        </Text>
        {/* These should be positioned left and right */}
        <Grid templateColumns="repeat(2,1fr)">
          <GridItem w="100%" h="10" bg="blue.100" > 
            <Text>
              Uncontrollable {/* Insert minVal here */}
            </Text>
          </GridItem>
          <GridItem w="100%" h="10" bg="blue.100"> 
            <Text>
              Controllable {/* Insert minVal here */}
            </Text>
          </GridItem>
        </Grid>
        <SliderElement />
      </Card>
      <Box>
        <Button marginTop={8} onClick={startUnitySession}> 
          {/* Make sure button is inactive until all questions are answered */}
          {/* Check if value of answer[i] is null, if so, be inactive. */}
          Start session
        </Button>
      </Box>
    </Flex>
  );
};

export default QuestionnairePage;

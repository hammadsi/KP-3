import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import SliderElement from '../components/SliderElement';
import { useState } from 'react';

type ExercisePageParams = {
  patientId: string;
  exerciseId: string;
};

const QuestionnairePage: React.FC = () => {
  // const navigate = useNavigate();
  // const { patientId, exerciseId } = useParams<ExercisePageParams>();
  {/* Insert GET to get the questionnaire based on sessionID and sensor */}

  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Initialize the button as disabled
  const [sliderValue, setSliderValue] = useState(0); // Store the slider value

  // Update the button disabled state based on the slider value
  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue);
    setIsButtonDisabled(newValue === 0); // Button is disabled if sliderValue is 0
  };

  
  const startUnitySession = () => {
    // Open the Unity game using the custom URI scheme
    window.location.href = `VRWheelchairSim://`;
    {/* Insert PUT here to send answers to questionnaire based on sessionID and userID */}
    {/* Insert GET here to get the post questionnaire */}
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
        Pre Questionnaire {/* Insert name here */}
      </Text>

      {/* Insert questionnaire here. */}
      <Card minW="lg" padding="30px">
        <Text fontSize={16} fontWeight="semibold" color="gray.600">
          How are you feeling? {/* Insert question here */}
        </Text>
        {/* These should be positioned left and right */}
        <Grid templateColumns="repeat(5,1fr)" marginTop="20px">
          <GridItem colStart={1} h="10"> 
            <Text as='i'>
              Uncontrollable {/* Insert minVal here */}
            </Text>
          </GridItem>
          <GridItem colStart={5} h="10"> 
            <Text as='i'>
              Controllable {/* Insert minVal here */}
            </Text>
          </GridItem>
        </Grid>
        <SliderElement onSliderChange={handleSliderChange} />
      </Card>
      <Box>
          <Button marginTop={8} isDisabled={isButtonDisabled} onClick={startUnitySession}> 
            {/* Make sure button is inactive until all questions are answered */}
            {/* Check if value of answer[i] is null, if so, be inactive. */}
            Start session
          </Button>
      </Box>
    </Flex>
  );
};

export default QuestionnairePage;

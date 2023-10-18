import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import SliderElement from '../components/SliderElement';
import React, { useState } from 'react';
import Card from '../components/Card';

type ExercisePageParams = {
  patientId: string;
  exerciseId: string;
};

const QuestionnairePage: React.FC = () => {
  const sliderCount = 3; // The number of sliders you have
  const [sliderValues, setSliderValues] = useState(Array(sliderCount).fill(0));

  const handleSliderChange = (index: number, newValue: number) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = newValue;
    setSliderValues(newSliderValues);
  };

  const areAllSlidersFilled = sliderValues.every(value => value > 0);

  const startUnitySession = () => {
    // Open the Unity game using the custom URI scheme
    window.location.href = `VRWheelchairSim://`;
    /* Insert PUT here to send answers to questionnaire based on sessionID and userID */
    /* Insert GET here to get the post questionnaire */
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexDirection="column"
      padding="20px"
      overflowY="hidden"
    >
      <Text fontSize={26} fontWeight="semibold" color="gray.600" marginBottom={4}>
        Pre Questionnaire {/* Insert name here */}
      </Text>

      {/* Insert questionnaire here. */
      sliderValues.map((sliderValue, index) => (
        <Card key={index} minW="lg" paddingTop={4} paddingBottom={8}>
          <Text fontSize={16} fontWeight="semibold" color="gray.600">
            How are you feeling? {/* Insert question here */}
          </Text>
          <Grid templateColumns="repeat(5,1fr)" marginTop={2}>
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
          <SliderElement
            onSliderChange={value => handleSliderChange(index, value)}
          />
        </Card>
      ))}
      <Box>
        <Button marginTop={4} isDisabled={!areAllSlidersFilled} onClick={startUnitySession}>
          Start game {/* Insert "End session" on the post-questionnaire */}
        </Button>
      </Box>
    </Flex>
  );
};

export default QuestionnairePage;

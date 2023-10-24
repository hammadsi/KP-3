import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SliderQuestion from '../components/SliderQuestion';
import FreeTextQuestion from '../components/FreeTextQuestion';
import RadioQuestion from '../components/RadioQuestion';
import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';

const PreQuestionnairePage: React.FC = () => {
  const navigate = useNavigate();
  const [radioAnswer, setRadioAnswer] = useState('');
  const [sliderAnswer, setSliderAnswer] = useState(0);
  const [freeTextAnswer, setFreeTextAnswer] = useState('');

  const startUnitySession = () => {
    // Open the Unity game using the custom URI scheme
    window.location.href = `VRWheelchairSim://`;
    /* Insert PUT here to send answers to questionnaire based on sessionID and userID */
    /* Insert GET here to get the post questionnaire */
    navigate('/game/post');
  };

  function checkIfAllIsFIlled(): boolean {
    if (
      radioAnswer.length < 1 ||
      sliderAnswer < 1 ||
      freeTextAnswer.length < 1
    ) {
      return false;
    }
    return true;
  }

  const handleRadioCallBack = (childData: string) => {
    setRadioAnswer(childData);
  };

  const handleSliderCallBack = (childData: number) => {
    setSliderAnswer(childData);
  };

  const handleFreeTextCallBack = (childData: string) => {
    setFreeTextAnswer(childData);
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexDirection="column">
      <Text
        fontSize={26}
        fontWeight="semibold"
        color="gray.600"
        marginBottom={4}>
        Pre Questionnaire
      </Text>
      {/* Insert all of the questions here */}
      <RadioQuestion
        question={'Are you a wheelchair user?'}
        parentCallBack={handleRadioCallBack}
      />
      <SliderQuestion
        question={
          'On a scale from 1 to 5, what is your current level of fitness?'
        }
        parentCallBack={handleSliderCallBack}
      />
      <FreeTextQuestion
        question={'Do you have any other comments?'}
        parentCallBack={handleFreeTextCallBack}
      />
      <Box>
        <Button
          isDisabled={!checkIfAllIsFIlled()}
          marginTop={4}
          onClick={startUnitySession}>
          Start game
        </Button>
      </Box>
    </Flex>
  );
};

export default withLayout(withSpinner(PreQuestionnairePage, 300));

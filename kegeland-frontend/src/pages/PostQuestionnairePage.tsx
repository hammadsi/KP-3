import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import withSpinner from '../hoc/withSpinner';
import SliderQuestion from '../components/SliderQuestion';
import FreeTextQuestion from '../components/FreeTextQuestion';
import RadioQuestion from '../components/RadioQuestion';
import withLayout from '../hoc/withLayout';

const PostQuestionnairePage: React.FC = () => {
  const navigate = useNavigate();
  const [radioAnswer, setRadioAnswer] = useState('');
  const [sliderAnswer, setSliderAnswer] = useState(0);
  const [freeTextAnswer, setFreeTextAnswer] = useState('');

  const endSession = () => {
    navigate('/');
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
        Post Questionnaire
      </Text>
      {/* Insert all of the questions here */}

      <SliderQuestion
        question={
          'On a scale from 1 to 5: How high was your motivation to put in effort during the workout session?'
        }
        parentCallBack={handleSliderCallBack}
      />
      <RadioQuestion
        question={'Would you reccomend this workout session to others?'}
        parentCallBack={handleRadioCallBack}
      />
      <FreeTextQuestion
        question={
          'Do you have any feedback or ideas for the further development of this device? Please let us know, your thoughts are important!'
        }
        parentCallBack={handleFreeTextCallBack}
      />
      <Box>
        <Button
          isDisabled={!checkIfAllIsFIlled()}
          marginTop={4}
          onClick={endSession}>
          End session
        </Button>
      </Box>
    </Flex>
  );
};

export default withLayout(withSpinner(PostQuestionnairePage, 1000));

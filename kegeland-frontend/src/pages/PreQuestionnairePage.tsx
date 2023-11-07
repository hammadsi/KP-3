import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../state/store';
import SliderQuestion from '../components/SliderQuestion';
import FreeTextQuestion from '../components/FreeTextQuestion';
import RadioQuestion from '../components/RadioQuestion';
import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';
import useUpdateGameSession from '../hooks/useUpdateGameSession';
import useWheelchairPatient from '../hooks/useWheelchairPatient';

const PreQuestionnairePage: React.FC = () => {
  const location = useLocation();
  const sessionState = location.state as { sessionId: string }; // Typecasting for better autocomplete and error checking
  const sessionId = sessionState?.sessionId;

  const navigate = useNavigate();
  const [radioAnswer, setRadioAnswer] = useState('');
  const [sliderAnswer, setSliderAnswer] = useState(0);
  const [freeTextAnswer, setFreeTextAnswer] = useState('');

  const { authUser } = useSelector((state: RootState) => state.auth);
  const { wheelchairPatient } = useWheelchairPatient(authUser?.id);
  const { updateSession } = useUpdateGameSession();

  const startUnitySession = async () => {
    // Fetch the current session by id from the wheelchairPatient's array of gameSessions
    const currentSession = wheelchairPatient?.gameSessions.find(
      (session) => session.id === sessionId,
    );

    const questionnaireData = {
      preGame: [
        {
          question: 'Are you a wheelchair user?',
          answer: radioAnswer,
        },
        {
          question:
            'On a scale from 1 to 5, what is your current level of fitness?',
          answer: sliderAnswer.toString(),
        },
        {
          question: 'Do you have any other comments?',
          answer: freeTextAnswer,
        },
      ],
      postGame: [], // Assuming it's empty for now, since post-game questions might be filled later
    };

    if (typeof authUser === 'undefined') {
      throw new Error(
        "patientId is undefined, but it's required for updating the session data.",
      );
    }

    // Update the session

    const bearerToken = localStorage.getItem('access_token');
    if (!bearerToken) {
      throw new Error(
        "Bearer token is not found in local storage, can't proceed.",
      );
    }

    // Construct the URL to launch Unity
    const unityUrl = `VRWheelchairSim://?patientId=${authUser.id}&bearerToken=${bearerToken}&sessionId=${sessionId}`;

    // Update the session
    if (currentSession) {
      const updateData = {
        patientId: authUser.id,
        id: currentSession.id,
        sessionData: {
          ...currentSession,
          questionnaires: questionnaireData,
        },
      };

      try {
        await updateSession(updateData);
        window.location.href = unityUrl; // Launch Unity with the required parameters
        navigate('/game/post', { state: { sessionId } });
      } catch (error) {
        console.error('Error updating session:', error);
      }
    }
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

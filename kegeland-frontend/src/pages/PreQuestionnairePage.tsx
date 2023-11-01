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
// import useAddHeartRate from '../hooks/useAddHeartRate';
// import useAddSpeed from '../hooks/useAddSpeed';
// import useAddLap from '../hooks/useAddLap';

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

  // const { addHeartRate } = useAddHeartRate();
  // const { addSpeed } = useAddSpeed();
  // const { addLap } = useAddLap();

  const startUnitySession = async () => {
    // Fetch the current session by id from the wheelchairPatient's array of gameSessions
    const currentSession = wheelchairPatient?.gameSessions.find(
      (session) => session.id === sessionId,
    );

    const questionnaireData = {
      preGame: [
        {
          question: 'Are you a wheelchair user?',
          type: 'radio' as 'radio',
          answer: radioAnswer,
        },
        {
          question:
            'On a scale from 1 to 5, what is your current level of fitness?',
          type: 'scale' as 'scale',
          answer: sliderAnswer.toString(),
        },
        {
          question: 'Do you have any other comments?',
          type: 'freeText' as 'freeText',
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
    if (currentSession) {
      const updateData = {
        patientId: authUser.id,
        id: currentSession.id,
        sessionData: {
          ...currentSession,
          questionnaires: questionnaireData, // Update this part with the questionnaire answers
        },
      };

      try {
        await updateSession(updateData);
        /*
        // For manual testing, you can use the following code to add a lap to the session
        const timestamp1 = new Date();
        const timestamp2 = new Date(new Date().getTime() - 20000);
        await addLap(authUser.id, sessionId, 10, timestamp1);
        await addLap(authUser.id, sessionId, 20, timestamp2);
        
        // For manual testing, you can use the following code to add a speed to the session
        const leftSpeed = 7; // the left speed value
        const rightSpeed = 7; // the right speed value
        await addSpeed(authUser.id, sessionId, leftSpeed, rightSpeed, timestamp1);
        await addSpeed(authUser.id, sessionId, leftSpeed, rightSpeed, timestamp2);

        // For manual testing, you can use the following code to add a heart rate to the session    
        const heartRate = 80; // the heart rate value
        await addHeartRate(authUser.id, sessionId, heartRate, timestamp1);
        await addHeartRate(authUser.id, sessionId, heartRate, timestamp2);
        */
        window.location.href = `VRWheelchairSim://`;
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

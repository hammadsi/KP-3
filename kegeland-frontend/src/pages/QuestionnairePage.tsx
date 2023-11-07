import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import withSpinner from '../hoc/withSpinner';
import FreeTextQuestion from '../components/FreeTextQuestion';
import RadioQuestion from '../components/RadioQuestion';
import withLayout from '../hoc/withLayout';
import { RootState } from '../state/store';
import useUpdateGameSession from '../hooks/useUpdateGameSession';
import useWheelchairPatient from '../hooks/useWheelchairPatient';

const QuestionnairePage: React.FC = () => {
  const location = useLocation();
  const sessionState = location.state as { sessionId: string };
  const sessionId = sessionState?.sessionId;

  const navigate = useNavigate();
  const [radioAnswer, setRadioAnswer] = useState('');
  const [answerBorgScale1, setAnswerBorgScale1] = useState(0);
  const [answerBorgScale2, setAnswerBorgScale2] = useState(0);
  const [answerBorgScale3, setAnswerBorgScale3] = useState(0);
  const [answerPhysicalMeasures1, setaAswerPhysicalMeasures1] = useState("");
  const [answerEnjoyment1, setAnswerEnjoyment1] = useState(0);
  const [answerEnjoyment2, setAnswerEnjoyment2] = useState(0);
  const [answerEnjoyment3, setAnswerEnjoyment3] = useState(0);
  const [answerEnjoyment4, setAnswerEnjoyment4] = useState(0);
  const [answerUserExperience1, setAnswerUserExperience1] = useState(0);
  const [answerFeedback1, setFeedback1] = useState(0);
  const [freeTextAnswer, setFreeTextAnswer] = useState('');

  const { authUser } = useSelector((state: RootState) => state.auth);
  const { wheelchairPatient } = useWheelchairPatient(authUser?.id);
  const { updateSession } = useUpdateGameSession();

  const endSession = async () => {
    const currentSession = wheelchairPatient?.gameSessions.find(
      (session) => session.id === sessionId,
    );

    if (currentSession && authUser) {
      const questionnaireData = {
        ...currentSession.questionnaires, // Spreads existing questionnaire data including preGame
        postGame: [
          {
            question: 'On a scale from 6-20: Please rate your perceived exertion after FIRST interval',
            answer: answerBorgScale1.toString(),
            category: 'Borg Scale',
            chronology: 1
          },
          {
            question: 'On a scale from 6-20: Please rate your perceived exertion after SECOND interval',
            answer: answerBorgScale2.toString(),
            category: 'Borg Scale',
            chronology: 2
          },
          {
            question: 'On a scale from 6-20: Please rate your perceived exertion after the LAST interval',
            answer: answerBorgScale3.toString(),
            category: 'Borg Scale',
            chronology: 3
          },
          {
            question: 'Did you experience any feelings of nausea during or after the exercise game?',
            answer: answerPhysicalMeasures1,
            category: 'Physical Measures',
            chronology: 1
          },
          {
            question: 'I enjoyed the activity',
            answer: answerEnjoyment1.toString(),
            category: 'Enjoyment',
            chronology: 1
          },
          {
            question: 'I found the activity pleasurable.',
            answer: answerEnjoyment2.toString(), 
            category: 'Enjoyment',
            chronology: 2
          },
          {
            question: 'The activity was very pleasant',
            answer: answerEnjoyment3.toString(), 
            category: 'Enjoyment',
            chronology: 3
          },
          {
            question: 'The activity felt good',
            answer: answerEnjoyment4.toString(), 
            category: 'Enjoyment',
            chronology: 4
          },
          {
            question: 'How does this workout session compare to your usual exercise routines in terms of engagement and enjoyment?',
            answer: answerUserExperience1, // endres
            category: 'User experience',
            chronology: 1
          },
          {
            question: 'Do you have any feedback or ideas for the further development of this device? Please let us know, your thoughts are important!',
            answer: answerFeedback1, // endres
            category: 'Feedback',
            chronology: 1
          },
        ],
      };

      const updateData = {
        patientId: authUser.id,
        id: sessionId,
        sessionData: {
          ...currentSession,
          questionnaires: questionnaireData,
        },
      };

      try {
        navigate('/'); // Or navigate to any page you wish
      } catch (error) {
        console.error('Error updating post-game session:', error);
      }
    }
  };

  function checkIfAllIsFIlled(): boolean {
    if (
      radioAnswer.length < 1 ||
      //sliderAnswer < 1 ||
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
    //setSliderAnswer(childData);
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
      <SliderQuestionCustom
        question={
          'On a scale from 6-20: Please rate your perceived exertion after FIRST interval'
        }
        parentCallBack={handleSliderCallBack}
      />
      <SliderQuestionCustom
        question={
          'On a scale from 6-20: Please rate your perceived exertion after SECOND interval'
        }
        parentCallBack={handleSliderCallBack}
      />
      <SliderQuestionCustom
        question={
          'On a scale from 6-20: Please rate your perceived exertion after the LAST interval'
        }
        parentCallBack={handleSliderCallBack}
      />
      <SelectQuestion
        question={
          'Did you experience any feelings of nausea during or after the exercise game?'
        }
        options={['Not at all', 'A little', 'Moderately', 'Very']}
        parentCallBack={handleRadioCallBack}
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

export default withLayout(withSpinner(QuestionnairePage, 1000));
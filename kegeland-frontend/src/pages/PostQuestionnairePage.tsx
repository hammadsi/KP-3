import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import withSpinner from '../hoc/withSpinner';
import SelectQuestion from '../components/SelectQuestion';
import SliderQuestionCustom from '../components/SliderQuestionCustom';
import FreeTextQuestion from '../components/FreeTextQuestion';
import withLayout from '../hoc/withLayout';
import { RootState } from '../state/store';
import useUpdatePostGameQuestionnaire from '../hooks/useUpdatePostGameQuestionnaire';
import useWheelchairPatient from '../hooks/useWheelchairPatient';
import SliderQuestion from '../components/SliderQuestion';

const PostQuestionnairePage: React.FC = () => {
  const location = useLocation();
  const sessionState = location.state as { sessionId: string };
  const sessionId = sessionState?.sessionId;

  const navigate = useNavigate();
  const [answerBorgScale1, setAnswerBorgScale1] = useState(0);
  const [answerBorgScale2, setAnswerBorgScale2] = useState(0);
  const [answerBorgScale3, setAnswerBorgScale3] = useState(0);
  const [answerPhysicalMeasures1, setAnswerPhysicalMeasures1] = useState('');
  const [answerEnjoyment1, setAnswerEnjoyment1] = useState('');
  const [answerEnjoyment2, setAnswerEnjoyment2] = useState('');
  const [answerEnjoyment3, setAnswerEnjoyment3] = useState('');
  const [answerEnjoyment4, setAnswerEnjoyment4] = useState('');
  const [answerUserExperience1, setAnswerUserExperience1] = useState(0);
  const [answerFeedback1, setAnswerFeedback1] = useState('');

  const [questionCounter, setQuestionCounter] = useState(0);

  const { authUser } = useSelector((state: RootState) => state.auth);
  const { wheelchairPatient } = useWheelchairPatient(authUser?.id);
  const { updateQuestionnaire, loading, error } =
    useUpdatePostGameQuestionnaire();

  const endSession = async () => {
    const currentSession = wheelchairPatient?.gameSessions.find(
      (session) => session.id === sessionId,
    );

    if (currentSession && authUser) {
      const questionnaireData = {
        ...currentSession.questionnaires, // Spreads existing questionnaire data including preGame
        postGame: [
          {
            question:
              'On a scale from 6-20: Please rate your perceived exertion after FIRST interval',
            answer: answerBorgScale1.toString(),
            category: 'Borg Scale',
            chronology: 1,
          },
          {
            question:
              'On a scale from 6-20: Please rate your perceived exertion after SECOND interval',
            answer: answerBorgScale2.toString(),
            category: 'Borg Scale',
            chronology: 2,
          },
          {
            question:
              'On a scale from 6-20: Please rate your perceived exertion after the LAST interval',
            answer: answerBorgScale3.toString(),
            category: 'Borg Scale',
            chronology: 3,
          },
          {
            question:
              'Did you experience any feelings of nausea during or after the exercise game?',
            answer: answerPhysicalMeasures1.toString(),
            category: 'Physical Measures',
            chronology: 1,
          },
          {
            question: 'I enjoyed the activity',
            answer: answerEnjoyment1.toString(),
            category: 'Enjoyment',
            chronology: 1,
          },
          {
            question: 'I found the activity pleasurable',
            answer: answerEnjoyment2.toString(),
            category: 'Enjoyment',
            chronology: 2,
          },
          {
            question: 'The activity was very pleasant',
            answer: answerEnjoyment3.toString(),
            category: 'Enjoyment',
            chronology: 3,
          },
          {
            question: 'The activity felt good',
            answer: answerEnjoyment4.toString(),
            category: 'Enjoyment',
            chronology: 4,
          },
          {
            question:
              'How does this workout session compare to your usual exercise routines in terms of engagement and enjoyment?',
            answer: answerUserExperience1.toString(),
            category: 'User experience',
            chronology: 1,
          },
          {
            question:
              'Do you have any feedback or ideas for the further development of this device? Please let us know, your thoughts are important!',
            answer: answerFeedback1.toString(),
            category: 'Feedback',
            chronology: 1,
          },
        ],
      };

      try {
        await updateQuestionnaire(
          authUser.id,
          sessionId,
          questionnaireData.postGame,
        );
        navigate('/'); // Or navigate to any page you wish
      } catch (error) {
        console.error('Error updating post-game session:', error);
      }
    }
  };

  function checkIfAllIsFIlled(questionCounter: number): boolean {
    if (questionCounter === 0) {
      if (
        answerBorgScale1 === 0 ||
        answerBorgScale2 === 0 ||
        answerBorgScale3 === 0
      ) {
        return false;
      }
    }
    if (questionCounter === 1) {
      if (answerPhysicalMeasures1 === '') {
        return false;
      }
    }
    if (questionCounter === 2) {
      if (
        answerEnjoyment1 === '' ||
        answerEnjoyment2 === '' ||
        answerEnjoyment3 === '' ||
        answerEnjoyment4 === ''
      ) {
        return false;
      }
    }
    if (questionCounter === 3) {
      if (answerUserExperience1 === 0) {
        return false;
      }
    }
    return true;
  }

  const handleValueChange = <T,>(
    setValue: React.Dispatch<React.SetStateAction<T>>,
    value: T,
  ) => {
    setValue(value);
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
        Post Game Questionnaire
      </Text>
      {questionCounter === 0 && (
        <>
          <SliderQuestionCustom
            question={
              'On a scale from 6-20: Please rate your perceived exertion after FIRST interval'
            }
            parentCallBack={(value) =>
              handleValueChange(setAnswerBorgScale1, value)
            }
          />
          <SliderQuestionCustom
            question={
              'On a scale from 6-20: Please rate your perceived exertion after SECOND interval'
            }
            parentCallBack={(value) =>
              handleValueChange(setAnswerBorgScale2, value)
            }
          />
          <SliderQuestionCustom
            question={
              'On a scale from 6-20: Please rate your perceived exertion after the LAST interval'
            }
            parentCallBack={(value) =>
              handleValueChange(setAnswerBorgScale3, value)
            }
          />
          {/* Simply remove this button to make the questionnaire neccessary */}
          <Button marginTop={4} onClick={() => navigate('/')}>
            Skip Questionnaire
          </Button>
        </>
      )}
      {questionCounter === 1 && (
        <>
          <SelectQuestion
            question={
              'Did you experience any feelings of nausea during or after the exercise game?'
            }
            options={['Not at all', 'A little', 'Moderately', 'Very']}
            parentCallBack={(value) =>
              handleValueChange(setAnswerPhysicalMeasures1, value)
            }
          />
        </>
      )}
      {questionCounter === 2 && (
        <>
          <Text
            fontSize={18}
            fontWeight="regular"
            color="gray.600"
            marginBottom={4}
            maxWidth="600px"
            width="50%"
            textAlign="left"
            style={{ width: '600' }}>
            We are interested in understanding how much people enjoy engaging in
            this activity. Think about the activity you just performed, and rank
            the following statements
          </Text>
          <SelectQuestion
            question={'I enjoyed the activity'}
            options={[
              'Strongly disagree',
              'Disagree',
              'Neutral',
              'Agree',
              'Strongly agree',
            ]}
            parentCallBack={(value) =>
              handleValueChange(setAnswerEnjoyment1, value)
            }
          />
          <SelectQuestion
            question={'I found the activity pleasurable.'}
            options={[
              'Strongly disagree',
              'Disagree',
              'Neutral',
              'Agree',
              'Strongly agree',
            ]}
            parentCallBack={(value) =>
              handleValueChange(setAnswerEnjoyment2, value)
            }
          />
          <SelectQuestion
            question={'The activity was very pleasant'}
            options={[
              'Strongly disagree',
              'Disagree',
              'Neutral',
              'Agree',
              'Strongly agree',
            ]}
            parentCallBack={(value) =>
              handleValueChange(setAnswerEnjoyment3, value)
            }
          />
          <SelectQuestion
            question={'The activity felt good'}
            options={[
              'Strongly disagree',
              'Disagree',
              'Neutral',
              'Agree',
              'Strongly agree',
            ]}
            parentCallBack={(value) =>
              handleValueChange(setAnswerEnjoyment4, value)
            }
          />
        </>
      )}
      {questionCounter === 3 && (
        <>
          <SliderQuestion
            question={
              'On a scaler from 1-5: How does this workout session compare to your usual exercise routines in terms of engagement and enjoyment?'
            }
            parentCallBack={(value) =>
              handleValueChange(setAnswerUserExperience1, value)
            }
          />
          <FreeTextQuestion
            question={
              'Do you have any feedback or ideas for the further development of this device? Please let us know, your thoughts are important!'
            }
            parentCallBack={(value) =>
              handleValueChange(setAnswerFeedback1, value)
            }
          />
        </>
      )}
      <Box>
        {questionCounter < 3 && (
          <>
            <Button
              isDisabled={!checkIfAllIsFIlled(questionCounter)}
              marginTop={4}
              onClick={() => setQuestionCounter(questionCounter + 1)}>
              Continue
            </Button>
          </>
        )}
        {questionCounter === 3 && (
          <>
            <Button
              isDisabled={!checkIfAllIsFIlled(questionCounter)}
              marginTop={4}
              onClick={endSession}>
              End session
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default withLayout(withSpinner(PostQuestionnairePage, 1000));

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import withSpinner from '../hoc/withSpinner';
import SelectQuestion from '../components/SelectQuestion';
import withLayout from '../hoc/withLayout';
import { RootState } from '../state/store';
import SliderQuestion from '../components/SliderQuestion';
import useUpdatePhysicalState from '../hooks/useUpdatePhysicalState';
import useWheelchairPatient from '../hooks/useWheelchairPatient';

/*
NOTE: This Questionnaire and code is not meant to be scalable,
 but rather to satisfy the research needs of the project as a last MVP feature.
*/
const QuestionnairePage: React.FC = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { updatePhysicalState } = useUpdatePhysicalState();
  const { wheelchairPatient } = useWheelchairPatient(authUser?.id);

  const navigate = useNavigate();
  const [answerIPAQ1, setAnswerIPAQ1] = useState('');
  const [answerIPAQ2, setAnswerIPAQ2] = useState('');
  const [answerIPAQ3, setAnswerIPAQ3] = useState('');
  const [answerIPAQ4, setAnswerIPAQ4] = useState('');
  const [answerIPAQ5, setAnswerIPAQ5] = useState('');
  const [answerIPAQ6, setAnswerIPAQ6] = useState('');
  const [answerIPAQ7, setAnswerIPAQ7] = useState('');
  const [answerEnjoyment1, setAnswerEnjoyment1] = useState('');
  const [answerEnjoyment2, setAnswerEnjoyment2] = useState('');
  const [answerEnjoyment3, setAnswerEnjoyment3] = useState('');
  const [answerEnjoyment4, setAnswerEnjoyment4] = useState('');
  const [answerFitnessLevel1, setAnswerFitnessLevel1] = useState(0);
  const [answerBREQ21, setAnswerBREQ21] = useState('');
  const [answerBREQ22, setAnswerBREQ22] = useState('');
  const [answerBREQ23, setAnswerBREQ23] = useState('');
  const [answerBREQ24, setAnswerBREQ24] = useState('');
  const [answerBREQ25, setAnswerBREQ25] = useState('');
  const [answerBREQ26, setAnswerBREQ26] = useState('');
  const [answerBREQ27, setAnswerBREQ27] = useState('');
  const [answerExerciseGames1, setAnswerExerciseGames1] = useState('');
  const [answerExerciseGames2, setAnswerExerciseGames2] = useState('');

  const [questionCounter, setQuestionCounter] = useState(0);

  const registerAnswers = async () => {

    if (authUser && wheelchairPatient) {
      const questionnaireData = [
        {
          question:
            'During the last 7 days, on how many days did you do vigorous physical activities like heavy lifting, digging, aerobics, or fast bicycling?',
          answer: answerIPAQ1.toString(),
          category: 'IPAQ',
          chronology: 1,
        },
        {
          question:
            'How much time did you usually spend doing vigorous physical activities on one of those days?',
          answer: answerIPAQ2.toString(),
          category: 'IPAQ',
          chronology: 2,
        },
        {
          question:
            'During the last 7 days, on how many days did you do moderate physical activities like carrying light loads, bicycling at a regular pace, or doubles tennis? Do not include walking.',
          answer: answerIPAQ3.toString(),
          category: 'IPAQ',
          chronology: 3,
        },
        {
          question:
            'How much time did you usually spend doing moderate physical activities on one of those days?',
          answer: answerIPAQ4.toString(),
          category: 'IPAQ',
          chronology: 4,
        },
        {
          question:
            'During the last 7 days, on how many days did you walk for at least 10 minutes at a time?',
          answer: answerIPAQ5.toString(),
          category: 'IPAQ',
          chronology: 5,
        },
        {
          question:
            'How much time did you usually spend walking on one of those days?',
          answer: answerIPAQ6.toString(),
          category: 'IPAQ',
          chronology: 6,
        },
        {
          question:
            'During the last 7 days, how much time did you spend sitting on a weekday?',
          answer: answerIPAQ7.toString(),
          category: 'IPAQ',
          chronology: 7,
        },
        {
          question: 'I enjoyed the activity',
          answer: answerEnjoyment1.toString(),
          category: 'Enjoyment',
          chronology: 1,
        },
        {
          question: 'I found the activity pleasurable.',
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
            'What is your current level of fitness? (1 = Unfit, 5 = Fit)',
          answer: answerFitnessLevel1.toString(),
          category: 'Workout habits and preferences',
          chronology: 1,
        },
        {
          question: "I feel guilty when I don’t exercise.",
          answer: answerBREQ21.toString(),
          category: "BREQ-2",
          chronology: 1,
        },
        {
          question: "I exercise because it’s fun.",
          answer: answerBREQ22.toString(),
          category: "BREQ-2",
          chronology: 2,
        },
        {
          question: "It’s important to me to exercise regularly.",
          answer: answerBREQ23.toString(),
          category: "BREQ-2",
          chronology: 3,
        },
        {
          question: "I can’t see why I should bother exercising.",
          answer: answerBREQ24.toString(),
          category: "BREQ-2",
          chronology: 4,
        },
        {
          question: "I think it is important to make the effort to exercise regularly.",
          answer: answerBREQ25.toString(),
          category: "BREQ-2",
          chronology: 5,
        },
        {
          question: "I get pleasure and satisfaction from participating in exercise.",
          answer: answerBREQ26.toString(),
          category: "BREQ-2",
          chronology: 6,
        },
        {
          question: "I think exercising is a waste of time.",
          answer: answerBREQ27.toString(),
          category: "BREQ-2",
          chronology: 7,
        },          
        {
          question:
            'Do you have any previous experience with exercise games?',
          answer: answerExerciseGames1.toString(), 
          category: 'Exercise games',
          chronology: 1,
        },
        {
          question:
            'Do you enjoy exercise games?',
          answer: answerExerciseGames2.toString(), 
          category: 'Exercise games',
          chronology: 2,
        },
      ];

      const updatedPhysicalState = {
        ...wheelchairPatient.currentPhysicalState,
        questionnaire: questionnaireData,
      };

      try {
        await updatePhysicalState(authUser.id, updatedPhysicalState);
        navigate('/');
      } catch (error) {
        console.error('Error registering questionnaire:', error);
      }
    }
  };

  function checkIfAllIsFIlled(questionCounter: number): boolean {
    if (questionCounter === 0) {
      if (
        answerIPAQ1 === '' ||
        answerIPAQ2 === '' ||
        answerIPAQ3 === '' ||
        answerIPAQ4 === '' ||
        answerIPAQ5 === '' ||
        answerIPAQ6 === '' ||
        answerIPAQ7 === ''
      ) {
        return false;
      }
    }
    if (questionCounter === 1) {
      if (answerFitnessLevel1 === 0) {
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
      if (
        answerBREQ21 === '' ||
        answerBREQ22 === '' ||
        answerBREQ23 === '' ||
        answerBREQ24 === '' ||
        answerBREQ25 === '' ||
        answerBREQ26 === '' ||
        answerBREQ27 === ''
      ) {
        return false;
      }
    }
    if (questionCounter === 4) {
      if (
        answerExerciseGames1 === '' ||
        answerExerciseGames2 === '' 
      ) {
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
  
  const subheader = {
    fontSize: 20,
    fontWeight: 'semibold',
    color: 'gray.600',
    marginBottom: 4,
  };

  const description = {
    fontSize: 18,
    fontWeight: 'regular',
    color: 'gray.600',
    marginBottom: 4,
    maxWidth: '600px',
    width: '50%',    
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
        Questionnaire
      </Text>
      {questionCounter === 0 && (
        <>
          <Text {...subheader}>
            International Physical Activity Questionnaire
          </Text>
          <Text {...description} textAlign="left" style={{ width: description.maxWidth }}>
            We are interested in finding out about the kinds of physical activities that people do as part of 
            their everyday lives. <br /><br /> The questions will ask you about the time you spent being physically 
            active in the last 7 days. Please answer each question even if you do not consider yourself to 
            be an active person. Please think about the activities you do at work, as part of your house and 
            yard work, to get from place to place, and in your spare time for recreation, exercise or sport.<br /><br />
            Think about all the vigorous activities that you did in the last 7 days. Vigorous physical 
            activities refer to activities that take hard physical effort and make you breathe much harder 
            than normal. Think only about those physical activities that you did for at least 10 minutes at 
            a time.
          </Text>
          <SelectQuestion
            question="During the last 7 days, on how many days did you do vigorous physical activities like heavy lifting, digging, aerobics, or fast bicycling?"
            options={['0', '1', '2', '3', '4', '5', '6', '7']}
            parentCallBack={(value) => handleValueChange(setAnswerIPAQ1, value)}
          />

          <SelectQuestion
            question="How much time did you usually spend doing vigorous physical activities on one of those days?"
            options={['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8']}
            parentCallBack={(value) => handleValueChange(setAnswerIPAQ2, value)}
          />

          <SelectQuestion
            question="During the last 7 days, on how many days did you do moderate physical activities like carrying light loads, bicycling at a regular pace, or doubles tennis? Do not include walking."
            options={['0', '1', '2', '3', '4', '5', '6', '7']}
            parentCallBack={(value) => handleValueChange(setAnswerIPAQ3, value)}
          />

          <SelectQuestion
            question="How much time did you usually spend doing moderate physical activities on one of those days?"
            options={['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8']}
            parentCallBack={(value) => handleValueChange(setAnswerIPAQ4, value)}
          />

          <SelectQuestion
            question="During the last 7 days, on how many days did you walk for at least 10 minutes at a time?"
            options={['0', '1', '2', '3', '4', '5', '6', '7']}
            parentCallBack={(value) => handleValueChange(setAnswerIPAQ5, value)}
          />

          <SelectQuestion
            question="How much time did you usually spend walking on one of those days?"
            options={['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8']}
            parentCallBack={(value) => handleValueChange(setAnswerIPAQ6, value)}
          />

          <SelectQuestion
            question="During the last 7 days, how much time did you spend sitting on a weekday?"
            options={['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']}
            parentCallBack={(value) => handleValueChange(setAnswerIPAQ7, value)}
          />

        </>
      )}
      {questionCounter === 1 && (
        <>
          <Text {...subheader}>
            Workout habits and preferences
          </Text>
          <SliderQuestion
            question={
              'What is your current level of fitness? (1 = Unfit, 5 = Fit) '
            }
            parentCallBack={(value) =>
              handleValueChange(setAnswerFitnessLevel1, value)
            }
          />
        </>
      )}
      {questionCounter === 2 && (
        <>
          <Text {...subheader}>
            Enjoyment of the exercise
          </Text>
          <Text {...description} textAlign="left" style={{ width: description.maxWidth }}>
            We are interested in understanding how much people enjoy engaging in physical activities. <br /><br />
            The questions will ask about your feelings of enjoyment related to physical activity in your 
            everyday life. Please consider all types of physical activities you engage in, including those at 
            work, during house and yard work, for transportation, and for leisure or exercise
          </Text>
          <SelectQuestion
            question={'I enjoy it'}
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
            question={'I find it pleasurable.'}
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
            question={'It is very pleasant'}
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
            question={'It feels good'}
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
          <Text {...subheader}>
          </Text>
          <Text {...description} textAlign="left" style={{ width: description.maxWidth }}>
            We are interested in the reasons underlying peoples' decisions to engage, or not engage in 
            physical exercise. <br /><br /> Using the scale below, please indicate to what extent each of the following 
            items is true for you. Please note that there are no right or wrong answers and no trick 
            questions. We simply want to know how you personally feel about exercise
          </Text>
          <SelectQuestion
            question="I feel guilty when I don’t exercise."
            options={[
              '0 (Not true for me)',
              '1',
              '2 (Sometimes true for me)',
              '3',
              '4 (Very true for me)'
            ]}
            parentCallBack={(value) => handleValueChange(setAnswerBREQ21, value)}
          />

          <SelectQuestion
            question="I exercise because it’s fun."
            options={[
              '0 (Not true for me)',
              '1',
              '2 (Sometimes true for me)',
              '3',
              '4 (Very true for me)'
            ]}
            parentCallBack={(value) => handleValueChange(setAnswerBREQ22, value)}
          />

          <SelectQuestion
            question="It’s important to me to exercise regularly."
            options={[
              '0 (Not true for me)',
              '1',
              '2 (Sometimes true for me)',
              '3',
              '4 (Very true for me)'
            ]}
            parentCallBack={(value) => handleValueChange(setAnswerBREQ23, value)}
          />

          <SelectQuestion
            question="I can’t see why I should bother exercising."
            options={[
              '0 (Not true for me)',
              '1',
              '2 (Sometimes true for me)',
              '3',
              '4 (Very true for me)'
            ]}
            parentCallBack={(value) => handleValueChange(setAnswerBREQ24, value)}
          />

          <SelectQuestion
            question="I think it is important to make the effort to exercise regularly."
            options={[
              '0 (Not true for me)',
              '1',
              '2 (Sometimes true for me)',
              '3',
              '4 (Very true for me)'
            ]}
            parentCallBack={(value) => handleValueChange(setAnswerBREQ25, value)}
          />

          <SelectQuestion
            question="I get pleasure and satisfaction from participating in exercise."
            options={[
              '0 (Not true for me)',
              '1',
              '2 (Sometimes true for me)',
              '3',
              '4 (Very true for me)'
            ]}
            parentCallBack={(value) => handleValueChange(setAnswerBREQ26, value)}
          />

          <SelectQuestion
            question="I think exercising is a waste of time."
            options={[
              '0 (Not true for me)',
              '1',
              '2 (Sometimes true for me)',
              '3',
              '4 (Very true for me)'
            ]}
            parentCallBack={(value) => handleValueChange(setAnswerBREQ27, value)}
          />
        </>
      )}
      {questionCounter === 4 && (
        <>
          <Text {...subheader}>
            Exercise games
          </Text>
          <SelectQuestion
            question={'Do you have any previous experience with exercise games?'}
            options={[
              'Yes',
              'No',
            ]}
            parentCallBack={(value) =>
              handleValueChange(setAnswerExerciseGames1, value)
            }
          />
          <SelectQuestion
            question={'Do you enjoy exercise games?'}
            options={[
              'Strongly disagree',
              'Disagree',
              'Neutral',
              'Agree',
              'Strongly agree',
            ]}
            parentCallBack={(value) =>
              handleValueChange(setAnswerExerciseGames2, value)
            }
          />
        </>
      )}
      <Box>
        {questionCounter < 4 && (
          <>
            <Button
              isDisabled={!checkIfAllIsFIlled(questionCounter)}
              marginTop={4}
              onClick={() => setQuestionCounter(questionCounter + 1)}>
              Continue
            </Button>
          </>
        )}
        {questionCounter === 4 && (
          <>
            <Button
              isDisabled={!checkIfAllIsFIlled(questionCounter)}
              marginTop={4}
              onClick={registerAnswers}>
              Register answers
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default withLayout(withSpinner(QuestionnairePage, 1000));

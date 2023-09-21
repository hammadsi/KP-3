import {useEffect, useState} from 'react';

import {DeviceType} from '~constants/bluetooth';
import {fetchQuestionnaire} from '~state/ducks/questions/questions.actions';
import {
  addAnswer,
  clearAnswers,
  clearQuestionnaire,
} from '~state/ducks/questions/questions.reducer';
import {isValidAnswers} from '~utils/questionnaire.utils';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

/**
 * Retrieves a questionnaire for a given device if the signed in user has a questionnaire assigned.
 * @param deviceType the device type
 */
const useQuestionnaire = (deviceType: DeviceType) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [hasQuestionnaire, setHasQuestionnaire] = useState<boolean>(false);
  const {auth, questions} = useAppSelector((state) => state);

  /**
   * Open the questionnaire modal
   */
  const open = () => {
    setVisible(true);
  };

  /**
   * Clear the used redux-state
   */
  const clear = () => {
    dispatch(clearQuestionnaire());
    dispatch(clearAnswers());
  };

  /**
   * Submit answers for a questionnaire
   * @param data the answers
   */
  const submit = (data: number[]) => {
    // Verify that the user is signed in and validate the answers
    if (auth.authUser && isValidAnswers(questions.questionnaire!, data)) {
      dispatch(
        addAnswer({
          userId: auth.authUser.id,
          answers: data,
          answeredAt: Date.now(),
        }),
      );
      setVisible(false);
    }
  };

  /**
   * Attempt to fetch questionnaire upon mount
   */
  useEffect(() => {
    if (auth.authUser) {
      dispatch(
        fetchQuestionnaire({sensor: deviceType, userId: auth.authUser.id}),
      ).then((res: any) => {
        if (res.payload) {
          // Set questionnaires to enabled if a questionnaire was found
          setHasQuestionnaire(true);
        }
      });
    }
    return () => {
      // Clear the state on unmount
      clear();
    };
  }, []);

  return {
    hasQuestionnaire,
    loading: auth.loading || questions.loading,
    questionnaire: questions.questionnaire,
    answers: questions.answers,
    visible,
    open,
    submit,
    clear,
  };
};

export default useQuestionnaire;

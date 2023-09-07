import {useEffect, useState} from 'react';

import {uploadAnswers} from '~state/ducks/questions/questions.actions';
import {clearAnswers} from '~state/ducks/questions/questions.reducer';
import {uploadSession} from '~state/ducks/session/session.actions';
import {UploadSessionResponse} from '~state/ducks/session/session.interface';
import {clearSession} from '~state/ducks/session/session.reducer';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

/**
 * Hook for handling exercise sessions.
 * Will upload the session to the database if requirements are met.
 * @param hasQuestionnaire whether or not the session uses a questionnaire
 */
const useCurrentSession = (hasQuestionnaire: boolean) => {
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const {questions, session, auth} = useAppSelector((state) => state);
  const {answers, questionnaire} = questions;
  const {authUser} = auth;
  const {currentSession} = session;

  const clear = () => {
    dispatch(clearSession());
    dispatch(clearAnswers());
  };

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  const dispatchSessionWithAnswers = async () => {
    setIsUploading(true);
    await dispatch(uploadSession({...currentSession!, userId: authUser?.id!}))
      .then(async (res) => {
        const {id} = res.payload as UploadSessionResponse;
        if (id) {
          return await dispatch(
            uploadAnswers({
              answers,
              questionnaireId: questionnaire!.id,
              sessionId: id,
            }),
          );
        }
      })
      .finally(() => {
        clear();
        setIsUploading(false);
      });
  };

  const dispatchSession = async () => {
    setIsUploading(true);
    await dispatch(
      uploadSession({...currentSession!, userId: authUser!.id}),
    ).finally(() => {
      clear();
      setIsUploading(false);
    });
  };

  const upload = async () => {
    if (authUser && currentSession) {
      if (hasQuestionnaire) {
        if (questionnaire?.id && answers.length === 2) {
          dispatchSessionWithAnswers();
        }
      } else {
        dispatchSession();
      }
    }
  };

  return {
    session: session.currentSession,
    loading: auth.loading || session.loading || questions.loading,
    isUploading,
    upload,
    clear,
  };
};

export default useCurrentSession;

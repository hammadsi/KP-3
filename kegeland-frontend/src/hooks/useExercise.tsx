import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';

import {
  fetchAssignedQuestionnaire,
  fetchQuestionnaireAnswers,
} from '../state/ducks/questionnaires/questionnaires.actions';
import { Answer } from '../state/ducks/questionnaires/questionnaires.interface';
import { clearQuestionnairesState } from '../state/ducks/questionnaires/questionnaires.reducer';
import { fetchSensor } from '../state/ducks/sensors/sensors.actions';
import { clearSensorsState } from '../state/ducks/sensors/sensors.reducer';
import { fetchSessionById } from '../state/ducks/sessions/sessions.actions';
import { clearSessionsState } from '../state/ducks/sessions/sessions.reducer';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import useSessionSensorSelector from './useSensorSelector';

const sortAnswers = (answers: Answer[]) =>
  answers.length >= 2
    ? answers.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        return -1;
      })
    : [];

const useExercise = (patientId: string, exerciseId: string) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { sensors, sessions, questionnaires } = useAppSelector(
    (state) => state,
  );
  const sensor = useSessionSensorSelector(sessions.session);

  useEffect(() => {
    dispatch(fetchSessionById({ patientId: patientId, exerciseId: exerciseId }))
    .then((result) => {
      if (result.payload) {
        console.log("Fetched session:", result.payload);
      } else {
        console.error("Payload is undefined. Full result:", result);
      }
    })
    .catch((error) => {
      console.error("Error fetching session:", error);
    });

    return () => {
      dispatch(clearSensorsState());
      dispatch(clearSessionsState());
      dispatch(clearQuestionnairesState());
    };
  }, []);

  useEffect(() => {
    if (sessions.session && sessions.session.id === exerciseId) {
      dispatch(fetchSensor(sessions.session.sensor));
      dispatch(
        fetchAssignedQuestionnaire({
          userId: patientId,
          sensor: sessions.session.sensor,
        }),
      );
    }
  }, [sessions.session]);

  useEffect(() => {
    if (questionnaires.questionnaire && sessions.session) {
      const questionnaireId = questionnaires.questionnaire.id;
      const id = sessions.session.id;
      dispatch(fetchQuestionnaireAnswers({ questionnaireId, id }));
    }
  }, [questionnaires.questionnaire, sessions.session]);

  useEffect(() => {
    if (
      loading &&
      !(sensors.loading && sessions.loading && questionnaires.loading)
    ) {
      setLoading(false);
    } else if (
      !loading &&
      (sensors.loading || sessions.loading || questionnaires.loading)
    ) {
      setLoading(true);
    }
  }, [sensors.loading, sessions.loading, questionnaires.loading]);

  return {
    sensor,
    session: sessions.session,
    questionnaire: questionnaires.questionnaire,
    answers: sortAnswers(cloneDeep(questionnaires.answers)),
    loading,
  };
};

export default useExercise;

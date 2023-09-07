import React, {ComponentType, useEffect} from 'react';

import QuestionnaireModal from '~components/QuestionnaireModal';
import {DeviceType} from '~constants/bluetooth';
import useCurrentSession from '~hooks/useCurrentSession';
import useQuestionnaire from '~hooks/useQuestionnaire';
import {Answer} from '~state/ducks/questions/questions.interface';
import {ExerciseSession} from '~state/ducks/session/session.interface';

export type WithQuestionnaireContext = {
  session: ExerciseSession;
  answers: Answer[];
  hasQuestionnaire: boolean;
  loading: boolean;
  openQuestionnaire: () => void;
};

/**
 * Higher-order component withQuestionnaire.
 * Wraps the component with questionnaire-functionality.
 * Will fetch the questionnaire based on the device type if the signed in user
 * has a questionnaire assigned for the specific device.
 * @param deviceType the type of device to select
 * @param Component the component to wrap
 */
const withQuestionnaire =
  <P extends WithQuestionnaireContext>(
    deviceType: DeviceType,
    Component: ComponentType<P>,
  ): ComponentType<Omit<P, keyof WithQuestionnaireContext>> =>
  (props) => {
    const questionnaire = useQuestionnaire(deviceType);
    const session = useCurrentSession(questionnaire.hasQuestionnaire);

    // Set props for passing to the sub-component
    const mapStateToProps: any = {
      session: session.session,
      answers: questionnaire.answers,
      hasQuestionnaire: questionnaire.hasQuestionnaire,
      loading: questionnaire.loading || session.loading,
      openQuestionnaire: questionnaire.open,
    };

    useEffect(() => {
      // Open questionnaire if a questionnaire is assigned and 1 out of 2 answers has been answered.
      if (
        session.session &&
        questionnaire.hasQuestionnaire &&
        questionnaire.answers.length === 1
      ) {
        questionnaire.open();
      }
    }, [session.session]);

    /**
     * Upload the session if state allows for it.
     * Requires 2 answers and a session if questionnaire is enabled. Will
     * only require a session if not.
     */
    useEffect(() => {
      if (session.session && !questionnaire.visible && !session.isUploading) {
        session.upload();
      }
    }, [session.session, questionnaire.submit]);

    return (
      <>
        <Component {...props} {...mapStateToProps} />
        <QuestionnaireModal
          onSubmit={questionnaire.submit}
          visible={questionnaire.visible}
          questionnaire={questionnaire.questionnaire}
        />
      </>
    );
  };

export default withQuestionnaire;

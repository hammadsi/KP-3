import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Paragraph,
  Text,
} from 'react-native-paper';

import FemfitGame from '~lib/femfit/game';
import {DeviceScreenProps} from '~routes/interface';
import {ExerciseScheme} from '~lib/femfit/game/interface';
import exercises from '~lib/femfit/game/exercises.json';
import Popup from '~components/Popup';
import {getEstimatedExerciseDuration} from '~lib/femfit/game/utils';
import PageWrapper from '~components/PageWrapper';
import {WithDeviceContext} from '~hoc/withDevice';
import {WithQuestionnaireContext} from '~hoc/withQuestionnaire';
import useAppSelector from '~hooks/useAppSelector';

export type FemfitScreenProps = DeviceScreenProps<'Femfit'> &
  WithDeviceContext &
  WithQuestionnaireContext;

/**
 * FemfitScreen. Screen for exercising with the femfit-sensor.
 * The screen will display a selection of exercises, and initiate a game once
 * an exercise is selected.
 * @see {@link FemfitScreenProps}
 */
const FemfitScreen: React.FC<FemfitScreenProps> = ({
  navigation,
  session,
  answers,
  device,
  hasQuestionnaire,
  loading,
  openQuestionnaire,
}) => {
  const [exercise, setExercise] = useState<ExerciseScheme>();
  const [modalItem, setModalItem] = useState<ExerciseScheme>();
  const {currentSession} = useAppSelector((state) => state.session);

  /**
   * Clear the state
   */
  const clear = () => {
    setExercise(undefined);
    setModalItem(undefined);
  };

  /**
   * Clear the state once the current session is undefined
   */
  useEffect(() => {
    if (!currentSession) {
      clear();
    }
  }, [currentSession]);

  /**
   * Toggle a details modal for selected exercise
   * @param item the exericse
   */
  const toggleDetails = (item?: ExerciseScheme) => {
    if (!item) {
      setModalItem(undefined);
    } else {
      setModalItem(item);
    }
  };

  /**
   * Select an exercise
   * Will trigger a questionnaire if enabled, and initiate the game
   * @param item the exercise
   */
  const selectExercise = (item: ExerciseScheme) => {
    setExercise(item);
    if (hasQuestionnaire) {
      openQuestionnaire();
    }
  };

  /**
   * Boolean function to decide whether or not the state allows for the game
   * to be rendered.
   * @returns true if game should be rendered
   */
  const shouldRenderGame = () => {
    if (device && exercise && !loading) {
      if (hasQuestionnaire) {
        return session === undefined && answers.length === 1;
      }
      return true;
    }
    return false;
  };

  const render = () => {
    if (shouldRenderGame()) {
      return (
        <SafeAreaView style={styles.wrapper}>
          <FemfitGame
            device={device!}
            exercise={exercise!}
            navigation={navigation}
          />
        </SafeAreaView>
      );
    } else if (loading) {
      return (
        <SafeAreaView style={styles.loader}>
          <ActivityIndicator animating={true} />
        </SafeAreaView>
      );
    }
    return (
      <PageWrapper
        title="Select exercise"
        contentSize="medium"
        testID="FemfitScreen">
        <ScrollView style={styles.exerciseList}>
          {(exercises as ExerciseScheme[]).map((item, idx) => (
            <Card style={styles.item} key={idx}>
              <Card.Content style={styles.itemContent}>
                <Card.Title
                  title={item.name}
                  subtitle={item.description}
                  subtitleNumberOfLines={2}
                />
                <Card.Actions style={styles.actions}>
                  <Button onPress={() => toggleDetails(item)}>Details</Button>
                  <Button onPress={() => selectExercise(item)} mode="contained">
                    Start exercise
                  </Button>
                </Card.Actions>
              </Card.Content>
            </Card>
          ))}
          <Popup
            title="Details"
            visible={modalItem !== undefined}
            contentContainerStyle={styles.detailPopup}
            onDismiss={() => toggleDetails(undefined)}
            actions={
              <Button onPress={() => toggleDetails(undefined)}>Close</Button>
            }>
            <Text style={styles.detailTitle}>{modalItem?.name}</Text>
            <ScrollView>
              <Paragraph>{modalItem?.description}</Paragraph>
            </ScrollView>
            {modalItem?.data && (
              <Text style={styles.detailDuration}>
                Estimated duration:&nbsp;
                <Text>{getEstimatedExerciseDuration(modalItem)} seconds</Text>
              </Text>
            )}
          </Popup>
        </ScrollView>
      </PageWrapper>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, position: 'relative'},
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseList: {
    marginTop: 16,
  },
  item: {
    marginBottom: 16,
  },
  itemContent: {
    padding: 0,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  detailPopup: {
    width: '90%',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailDuration: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  actions: {
    marginTop: 4,
    justifyContent: 'space-between',
  },
});

export default FemfitScreen;

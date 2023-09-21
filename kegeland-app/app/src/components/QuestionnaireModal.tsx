import {clone, map} from 'lodash';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Divider, RadioButton, Text, useTheme} from 'react-native-paper';

import {Questionnaire} from '~state/ducks/questions/questions.interface';

import Popup from './Popup';

export type QuestionnaireModalProps = {
  questionnaire: Questionnaire | undefined;
  visible: boolean;
  onSubmit: (data: number[]) => void;
};

/**
 * Component for rendering a questionnaire modal.
 * @param props the props
 * @see {@link QuestionnaireModalProps}
 * @see {@link Popup}
 */
const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({
  questionnaire,
  onSubmit,
  visible,
}) => {
  const {colors} = useTheme();
  const [answers, addAnswers] = useState<string[]>(
    map(questionnaire ? questionnaire.questions : [], () => '2'),
  );
  if (!questionnaire) return null;

  /**
   * Updates answer for a question
   * @param value answer
   * @param idx the question
   */
  const handleChange = (value: string, idx: number) => {
    const tmp = clone(answers);
    tmp[idx] = value;
    addAnswers(tmp);
  };

  /**
   * Submits the answers for the questionnaire
   */
  const handleSubmit = () =>
    // eslint-disable-next-line radix
    onSubmit(map(answers, (answer) => parseInt(answer)));

  return (
    <Popup
      testID="QuestionnaireModal"
      title={questionnaire.name}
      visible={visible && questionnaire !== undefined}
      actions={
        <Button testID="SubmitBtn" onPress={() => handleSubmit()}>
          Submit answers
        </Button>
      }
      contentContainerStyle={styles.popup}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        {questionnaire.questions.map((item, idx) => (
          <View
            key={`${item.question}_${idx}`}
            style={idx > 0 ? styles.question : undefined}>
            <Text style={styles.questionTitle}>{item.question}</Text>
            <RadioButton.Group
              onValueChange={(value) => handleChange(value, idx)}
              value={answers[idx]}>
              <View style={styles.radioGroup}>
                {Array.from(Array(5).keys()).map((val) => (
                  <View
                    style={styles.radioButton}
                    key={`${item.question}_${idx}_${val}`}>
                    <RadioButton.Android
                      color={colors.primary}
                      value={val.toString()}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.boundaries}>
                <Text style={styles.boundariesText}>{item.minVal}</Text>
                <Text style={styles.boundariesText}>{item.maxVal}</Text>
              </View>
            </RadioButton.Group>
            {idx < questionnaire.questions.length - 1 && <Divider />}
          </View>
        ))}
      </ScrollView>
    </Popup>
  );
};

const styles = StyleSheet.create({
  popup: {
    width: '90%',
    zIndex: 10000,
  },
  wrapper: {
    width: '100%',
    alignSelf: 'center',
  },
  question: {
    marginTop: 16,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  radioButton: {
    marginHorizontal: 8,
  },
  boundaries: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  boundariesText: {
    fontSize: 10,
  },
});

export default QuestionnaireModal;

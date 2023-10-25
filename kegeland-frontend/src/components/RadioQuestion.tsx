import { Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import Card from './Card';

interface RadioQuestionProps {
  question: string;
  parentCallBack: Function;
}

const RadioQuestion: React.FC<RadioQuestionProps> = ({
  question,
  parentCallBack,
}) => {
  const handleAnswerChange = (value: string) => {
    parentCallBack(value);
    setRadioValue(value);
  };

  const [radioValue, setRadioValue] = React.useState('');

  return (
    <Card minW="lg" paddingTop={4} paddingBottom={8} textAlign={'left'}>
      <Text
        fontSize={16}
        fontWeight="semibold"
        color="gray.600"
        paddingBottom={2}
        marginStart={0}
      >
        {question}
      </Text>
      <RadioGroup onChange={handleAnswerChange} value={radioValue}>
        <Stack direction={'column'}>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Stack>
      </RadioGroup>
    </Card>
  );
};

export default RadioQuestion;

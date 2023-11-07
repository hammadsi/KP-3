import React from 'react';
import {
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';

import Card from './Card';

interface SliderQuestionProps {
  question: string;
  options: string[];
  parentCallBack: Function;
}

const SelectQuestion: React.FC<SliderQuestionProps> = ({
  question,
  options,
  parentCallBack,
}) => {
  const handleSliderChange = (value: string) => {
    parentCallBack(value);
  };



  return (
    <Card w="lg" paddingTop={4} paddingBottom={8} textAlign={'left'}>
      <Text
        fontSize={16}
        fontWeight="semibold"
        color="gray.600"
        paddingBottom={2}
        marginStart={0}>
        {question}
      </Text>
      <Select onChange={(e) => handleSliderChange(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Card>
  );
};

export default SelectQuestion;

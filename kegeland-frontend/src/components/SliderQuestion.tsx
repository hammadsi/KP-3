import React from 'react';
import {
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
  parentCallBack: Function;
}

const SliderQuestion: React.FC<SliderQuestionProps> = ({
  question,
  parentCallBack,
}) => {
  const handleSliderChange = (value: number) => {
    parentCallBack(value);
  };

  function generateSliderMarks() {
    const sliderMarks = [];
    for (let i = 6; i <= 20; i += 2) {
      sliderMarks.push(
        <SliderMark value={i} mt="3" ml="-1" mb="10" fontSize="m">
          {i}
        </SliderMark>
      );
    }
    return sliderMarks;
  }

  const sliderMarks = generateSliderMarks();

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
      <Slider
        id="slider"
        defaultValue={0}
        min={6}
        max={20}
        onChange={handleSliderChange}
        step={1}
        size="lg">
        {sliderMarks}
        <SliderTrack>
          <SliderFilledTrack bg="blue.400" />
        </SliderTrack>
        <SliderThumb boxSize={5} bg="blue.200" />
      </Slider>
    </Card>
  );
};

export default SliderQuestion;

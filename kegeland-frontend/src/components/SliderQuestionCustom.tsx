import React, { useState } from 'react';
import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';

import Card from './Card';

interface SliderQuestionCustomProps {
  question: string;
  parentCallBack: (value: number) => void; // Specify that the callback is a function that takes a number
}

const SliderQuestionCustom: React.FC<SliderQuestionCustomProps> = ({
  question,
  parentCallBack,
}) => {
  const [sliderValue, setSliderValue] = useState(0); // Manage local state for slider value

  const handleSliderChange = (value: number) => {
    setSliderValue(value); // Set local state
    parentCallBack(value); // Call the parent callback with the new value
  };

  function generateSliderMarks() {
    const sliderMarks = [];
    for (let i = 6; i <= 20; i += 2) {
      sliderMarks.push(
        <SliderMark key={i} value={i} mt="3" ml="-1" mb="10" fontSize="sm">
          {i}
        </SliderMark>,
      );
    }
    return sliderMarks;
  }

  const sliderMarks = generateSliderMarks();

  return (
    <Card w="2xl" paddingTop={4} paddingBottom={8} textAlign={'left'}>
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
        value={sliderValue} // Use local state for value
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

export default SliderQuestionCustom;

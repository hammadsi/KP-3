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
        min={1}
        max={5}
        onChange={handleSliderChange}
        step={1}
        size="lg">
        <SliderMark value={1} mt="3" ml="-1" mb="10" fontSize="m">
          1
        </SliderMark>
        <SliderMark value={2} mt="3" ml="-1" mb="10" fontSize="m">
          2
        </SliderMark>
        <SliderMark value={3} mt="3" ml="-1" mb="10" fontSize="m">
          3
        </SliderMark>
        <SliderMark value={4} mt="3" ml="-1" mb="10" fontSize="m">
          4
        </SliderMark>
        <SliderMark value={5} mt="3" ml="-1" mb="10" fontSize="m">
          5
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack bg="blue.400" />
        </SliderTrack>
        <SliderThumb boxSize={5} bg="blue.200" />
      </Slider>
    </Card>
  );
};

export default SliderQuestionCustom;

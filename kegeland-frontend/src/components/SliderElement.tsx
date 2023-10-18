import { Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Box } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
interface SliderElementProps {
  onSliderChange: (value: number) => void;
}

const SliderElement: React.FC<SliderElementProps> = ({ onSliderChange }) => {
  const [sliderValue, setSliderValue] = useState(0);

  function handleSliderChange(v: number){
    setSliderValue(v);
    if(onSliderChange){
      onSliderChange(v);
    }
  }

  useEffect(() => {
    console.log(sliderValue);
  }, [sliderValue]);

    return (
      <Slider
        id='slider'
        defaultValue={0}
        min={1}
        max={5}
        onChange={handleSliderChange}
        step={1}
        size="lg"
      >
        <SliderMark value={1} mt='3' ml='-1' mb='10' fontSize='m'>
          1
        </SliderMark>
        <SliderMark value={2} mt='3' ml='-1' mb='10' fontSize='m'>
          2
        </SliderMark>
        <SliderMark value={3} mt='3' ml='-1' mb='10' fontSize='m'>
          3
        </SliderMark>
        <SliderMark value={4} mt='3' ml='-1' mb='10' fontSize='m'>
          4
        </SliderMark>
        <SliderMark value={5} mt='3' ml='-1' mb='10' fontSize='m'>
          5
        </SliderMark>
        <SliderTrack >
          <SliderFilledTrack bg="blue.400"/>
        </SliderTrack>
        <SliderThumb boxSize={5} bg="blue.200" />
      </Slider>
    )
  };

  export default SliderElement;
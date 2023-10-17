import { Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Box } from "@chakra-ui/react"
import React from "react"
import { MdGraphicEq } from "react-icons/md";

const SliderElement = () => {
    const [sliderValue, setSliderValue] = React.useState(5)
    const [showTooltip, setShowTooltip] = React.useState(false)
    return (
      <Slider
        id='slider'
        defaultValue={3}
        min={1}
        max={5}
        colorScheme='blue'
        onChange={(v: React.SetStateAction<number>) => setSliderValue(v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        step={1}
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
import React, { useState } from 'react';
import { Select, Text } from '@chakra-ui/react';
import Card from './Card';

interface SelectQuestionProps {
  question: string;
  options: string[];
  parentCallBack: (value: string) => void;
}

const SelectQuestion: React.FC<SelectQuestionProps> = ({
  question,
  options,
  parentCallBack,
}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
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
      <Select value={selectedOption} onChange={handleSelectChange}>
        <option value="" disabled hidden>Choose an option</option>
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

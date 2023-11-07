import React, { useState } from 'react';
import { Input, Text } from '@chakra-ui/react';

import Card from './Card';

interface FreeTextQuestionProps {
  question: string;
  parentCallBack: (value: string) => void; // Specify that the callback is a function that takes a string
}

const FreeTextQuestion: React.FC<FreeTextQuestionProps> = ({
  question,
  parentCallBack,
}) => {
  const [answer, setAnswer] = useState(''); // Manage local state for the input value

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer); // Update local state
    parentCallBack(newAnswer); // Call the parent callback with the new value
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
      <Input
        type="text"
        value={answer} // Use local state for value
        onChange={handleAnswerChange}
      />
    </Card>
  );
};

export default FreeTextQuestion;

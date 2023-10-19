import React, { useEffect, useState } from 'react';
import { Input, Text } from '@chakra-ui/react';

import Card from './Card';

interface FreeTextQuestionProps {
  question: string;
  parentCallBack: Function;
}

const FreeTextQuestion: React.FC<FreeTextQuestionProps> = ({
  question,
  parentCallBack,
}) => {
  const handleAnswerChange = (answer: string) => {
    parentCallBack(answer);
    setFreeTextAnswer(answer);
  };

  const [freeTextanswer, setFreeTextAnswer] = useState('');

  useEffect(() => {
    console.log(freeTextanswer);
  }, [freeTextanswer]);

  return (
    <Card minW="lg" paddingTop={4} paddingBottom={8} textAlign={'left'}>
      <Text
        fontSize={16}
        fontWeight="semibold"
        color="gray.600"
        paddingBottom={2}
        marginStart={0}>
        {question}
      </Text>
      <Input type="text" onChange={(e) => handleAnswerChange(e.target.value)} />
    </Card>
  );
};

export default FreeTextQuestion;

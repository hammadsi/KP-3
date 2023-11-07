import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Progress,
  Text,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';

import {
  Answer,
  Questionnaire,
} from '../state/ducks/questionnaires/questionnaires.interface';

type QuestionnaireResultsProps = {
  questionnaire: Questionnaire | undefined;
  answers: Answer[];
};

const getMinValOffset = (minVal: string) => {
  return `${Math.max(16 - Math.round(minVal.length / 2), 0) * 4}px`;
};

const getMaxValOffset = (maxVal: string) => {
  return `${Math.max(8 - Math.round(maxVal.length / 2), 0) * 4}px`;
};

const QuestionnaireResults: React.FC<QuestionnaireResultsProps> = ({
  questionnaire,
  answers,
}) => {
  const [isGreaterThanLg] = useMediaQuery('(min-width: 62em)');
  const render = () => {
    if (!questionnaire || answers.length < 2) {
      return (
        <Text textAlign="center" fontSize={18} color="gray.500">
          {!questionnaire
            ? 'No questionnaire assigned'
            : 'No answers for the assigned questionnaire'}
        </Text>
      );
    } else {
      return (
        <Box>
          <Heading as="h3" fontSize={20} fontWeight="normal">
            <span style={{ fontWeight: '500' }}>Questionnaire:</span>{' '}
            {questionnaire.name}
          </Heading>
          <Divider marginY={3} />
          <Grid
            templateColumns={
              isGreaterThanLg ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'
            }
            gap={5}
            marginBottom={5}>
            {questionnaire.questions.map((item, qidx) => (
              <GridItem key={qidx} paddingX={2}>
                <Text fontSize={18} fontWeight="normal">
                  {item.question}
                </Text>
                <Divider marginY={2} borderColor="primary.400" />
                <Flex justifyContent="space-between" marginBottom={1}>
                  <Text
                    fontWeight="semibold"
                    fontStyle="italic"
                    fontSize={14}
                    marginLeft={getMinValOffset(item.minVal)}>
                    {item.minVal}
                  </Text>
                  <Text
                    fontWeight="semibold"
                    fontStyle="italic"
                    fontSize={14}
                    marginRight={getMaxValOffset(item.maxVal)}>
                    {item.maxVal}
                  </Text>
                </Flex>
                {Array.from(Array(2), () => 0).map((_val, idx) => {
                  const answer = answers[idx].answers[qidx];
                  return (
                    <Flex
                      alignItems="center"
                      paddingRight={8}
                      key={`${qidx}-${idx}`}
                      _first={{ marginBottom: 2 }}>
                      <Text width={20} fontWeight="medium" letterSpacing={0.5}>
                        {idx ? 'After' : 'Before'}
                      </Text>
                      <Text fontWeight="semibold">1</Text>
                      <Tooltip hasArrow label={answer + 1}>
                        <Progress
                          textAlign="left"
                          colorScheme="primary"
                          width="full"
                          marginX={3}
                          max={4}
                          height={5}
                          value={answer}
                        />
                      </Tooltip>
                      <Text fontWeight="semibold">5</Text>
                    </Flex>
                  );
                })}
              </GridItem>
            ))}
          </Grid>
        </Box>
      );
    }
  };

  return render();
};

export default QuestionnaireResults;

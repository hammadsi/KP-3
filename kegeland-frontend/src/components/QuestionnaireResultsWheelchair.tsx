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


type QuestionnaireResultsProps = {
  questionnaire: any;
};

const getMinValOffset = (minVal: string) => {
  return `${Math.max(16 - Math.round(minVal.length / 2), 0) * 4}px`;
};

const getMaxValOffset = (maxVal: string) => {
  return `${Math.max(8 - Math.round(maxVal.length / 2), 0) * 4}px`;
};

const QuestionnaireResults: React.FC<QuestionnaireResultsProps> = ({questionnaire }) => {
  const [isGreaterThanLg] = useMediaQuery('(min-width: 62em)');
  const render = () => {
    if (!questionnaire) {
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
            <span style={{ fontWeight: '500' }}>Questionnaires</span>
          </Heading>
          <Divider marginY={3} />
          <Grid
            templateColumns={
              isGreaterThanLg ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'
            }
            gap={5}
            marginBottom={5}>
            <GridItem  paddingX={2}>
              <Text fontSize={18} fontWeight="normal">
                  Before:
              </Text>
              <Divider marginY={2} borderColor="primary.400" />
              <Flex flexDirection="column" alignItems="start">
                {questionnaire.preGame.map((item: any) => {
                const answer = item.type === 'radio' 
                  ? item.answer.toUpperCase() 
                  : item.type === 'scale' 
                    ? item.answer + "/5" 
                    : item.answer; 
                return (
                  <Flex flexDirection="column" alignItems="start" marginY={1}>
                    <p style={{fontWeight: 'bold'}}>{item.question}</p>
                    <span style={{fontStyle: 'italic'}}>{answer}</span>
                  </Flex>
                  );
                })}
              </Flex>
            </GridItem>
            <GridItem  paddingX={2}>
              <Text fontSize={18} fontWeight="normal">
                  After:
              </Text>
              <Divider marginY={2} borderColor="primary.400" />
              <Flex flexDirection="column" alignItems="start">
                {questionnaire.postGame.map((item: any) => {
                const answer = item.type === 'radio' 
                  ? item.answer.toUpperCase() 
                  : item.type === 'scale' 
                    ? item.answer + "/5" 
                    : item.answer; 
                return (
                  <Flex flexDirection="column" alignItems="start" marginY={1}>
                    <p style={{fontWeight: 'bold'}}>{item.question}</p>
                    <span style={{fontStyle: 'italic'}}>{answer}</span>
                  </Flex>
                  );
                })}
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      );
    }
  };

  return render();
};

export default QuestionnaireResults;

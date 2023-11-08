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

const QuestionnaireResults: React.FC<QuestionnaireResultsProps> = ({
  questionnaire,
}) => {
  const [isGreaterThanLg] = useMediaQuery('(min-width: 62em)');

  const renderQuestionItem = (item: any) => {
    if (item.category === 'Borg Scale') {
      const answer = parseInt(item.answer);
      const min = 6;
      const max = 20;
      const progressValue = ((answer - min) / (max - min)) * 100;
      return (
        <Flex flexDirection="column" alignItems="start" marginY={1}>
          <Text fontWeight="600" noOfLines={[2, 3]} textAlign="left">
            {item.question}
          </Text>
          <Flex alignItems="center" width="full">
            <Tooltip hasArrow label={'Rating: ' + answer + '/20'}>
              <Progress
                textAlign="left"
                colorScheme="primary"
                width="150px"
                marginX={3}
                max={100}
                height={5}
                value={progressValue}
              />
            </Tooltip>
            <Text marginLeft={2} fontStyle="italic" textAlign="left">
              {item.answer}/20
            </Text>
          </Flex>
        </Flex>
      );
    }
    // Handling for other types of items can be similar
    return (
      <Flex flexDirection="column" alignItems="start" marginY={1}>
        <Text fontWeight="600" noOfLines={[2, 3]} textAlign="left">
          {item.question}
        </Text>
        <Text fontStyle="italic" noOfLines={[1, 2]} textAlign="left">
          {item.answer}
        </Text>
      </Flex>
    );
  };

  const render = () => {
    if (!questionnaire) {
      return (
        <Text textAlign="center" fontSize="lg" color="gray.500">
          {!questionnaire
            ? 'No questionnaire assigned'
            : 'No answers for the assigned questionnaire'}
        </Text>
      );
    } else {
      return (
        <Box>
          <Heading as="h3" fontSize="2xl" fontWeight="normal">
            <span style={{ fontWeight: '500' }}>Questionnaires</span>
          </Heading>
          <Divider my={3} />
          <Grid
            templateColumns={
              isGreaterThanLg ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'
            }
            gap={5}
            mb={5}>
            {questionnaire.postGame.map((item: any, index: number) => (
              <GridItem colSpan={1} px={2} key={index} overflow="hidden">
                {renderQuestionItem(item)}
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

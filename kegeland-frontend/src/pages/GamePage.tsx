import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Wrap,
  WrapItem,
  useMediaQuery,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';
import QuestionnairePage from './QuestionnairePage';

const GamePage: React.FC = () => {
  return <QuestionnairePage />;
};

export default withLayout(withSpinner(GamePage));

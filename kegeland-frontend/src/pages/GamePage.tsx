import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';

import QuestionnairePage from './QuestionnairePage';

const GamePage: React.FC = () => {
  return <QuestionnairePage />;
};

export default withLayout(withSpinner(GamePage));

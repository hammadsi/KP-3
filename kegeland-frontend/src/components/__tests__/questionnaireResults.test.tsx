import renderer from 'react-test-renderer';

import { answers } from '../mocks/answers.mock';
import { questionnaire } from '../mocks/questionnaires.mock';
import QuestionnaireResults from '../QuestionnaireResults';

describe('Test questionnaire results', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: () => {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {},
        };
      },
    });
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <QuestionnaireResults
          answers={answers}
          questionnaire={questionnaire}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly no answers', () => {
    const tree = renderer
      .create(
        <QuestionnaireResults answers={[]} questionnaire={questionnaire} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly no questionnaire', () => {
    const tree = renderer
      .create(<QuestionnaireResults answers={[]} questionnaire={undefined} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

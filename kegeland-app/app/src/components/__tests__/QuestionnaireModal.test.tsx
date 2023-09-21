import React from 'react';

import {questionnaireMock} from '~state/ducks/__mocks__/questions.mock';
import {render} from '~utils/test-utils';

import QuestionnaireModal, {
  QuestionnaireModalProps,
} from '../QuestionnaireModal';

describe('Test QuestionnaireModal-component', () => {
  it('should render correctly', () => {
    const props: QuestionnaireModalProps = {
      visible: true,
      onSubmit: jest.fn(),
      questionnaire: questionnaireMock,
    };
    const component = <QuestionnaireModal {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

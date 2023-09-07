import React from 'react';

import {render} from '~utils/test-utils';

import exerciseMock from '../../__mocks__/exercise.mock';
import GameOverDialog, {GameOverDialogProps} from '../GameOverDialog';

describe('Test GameOverDialog-component', () => {
  it('should render correctly', () => {
    const props: GameOverDialogProps = {
      visible: true,
      goBack: jest.fn(),
      onDismiss: jest.fn(),
      exercise: exerciseMock,
      score: 10,
    };
    const component = <GameOverDialog {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

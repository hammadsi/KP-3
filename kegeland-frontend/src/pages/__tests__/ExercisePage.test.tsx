import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { mockStore } from '../../state/mocks/store.mock';
import ExercisePage from '../ExercisePage';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actualNav = jest.requireActual('react-router-dom');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
jest.mock('../../hooks/useBreadcrumbs', () => {
  return [];
});

describe('Test excercise', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={mockStore()}>
          <MemoryRouter>
            <ExercisePage />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

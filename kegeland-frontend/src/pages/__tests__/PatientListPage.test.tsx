import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { mockStore } from '../../state/mocks/store.mock';
import PatientListPage from '../PatientListPage';

jest.mock('../../hooks/useBreadcrumbs', () => {
  return [];
});

describe('Test excercise', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={mockStore()}>
          <MemoryRouter>
            <PatientListPage />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

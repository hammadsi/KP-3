import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { mockStore } from '../../state/mocks/store.mock';
import PatientPage from '../PatientPage';

jest.mock('../../hooks/useBreadcrumbs', () => {
  return [];
});

describe('Test excercise', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={mockStore()}>
          <MemoryRouter>
            <PatientPage />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { userMock } from '../mocks/user.mock';
import PatientsTable from '../PatientsTable';

describe('Test patients table', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <PatientsTable patients={[userMock, userMock]} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

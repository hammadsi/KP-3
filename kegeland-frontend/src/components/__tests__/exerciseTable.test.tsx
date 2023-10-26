import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import FemfitExerciseTable from '../FemfitExerciseTable';
import { sessionsMock } from '../mocks/sessions.mock';

describe('Test exercise table', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <FemfitExerciseTable sessions={sessionsMock} patientId="patientId" />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

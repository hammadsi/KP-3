import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import {
  routePathLoginFalseMock,
  routePathPatientPatientIdMock,
} from '../../utils/mocks/breadcrumb.mock';
import Breadcrumbs from '../Breadcrumbs';

describe('Test bredcrumb', () => {
  it('renders correctly empty', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Breadcrumbs crumbs={[]} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly patient', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Breadcrumbs crumbs={[routePathPatientPatientIdMock]} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly lgoin false', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Breadcrumbs crumbs={[routePathLoginFalseMock]} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

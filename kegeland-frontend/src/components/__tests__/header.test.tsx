import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Header from '../Header';

describe('Test header', () => {
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

  it('renders correctly closed', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Header isSidebarOpen={false} toggleSidebar={() => {}} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly open', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Header isSidebarOpen={true} toggleSidebar={() => {}} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

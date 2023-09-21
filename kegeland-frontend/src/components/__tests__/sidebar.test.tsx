import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { mockStore } from '../../state/mocks/store.mock';
import { userMock } from '../mocks/user.mock';
import Sidebar from '../Sidebar';

describe('Test Sidebar', () => {
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
    const store = mockStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Sidebar isOpen={false} mode={'dark'} user={userMock} />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly open', () => {
    const store = mockStore();
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Sidebar isOpen={true} mode={'dark'} user={userMock} />
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

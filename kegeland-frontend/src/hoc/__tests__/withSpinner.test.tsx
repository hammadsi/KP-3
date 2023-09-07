import { Text } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import withSpinner from '../withSpinner';
import { mockStore } from '../../state/mocks/store.mock';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('test withSpinner', () => {
  const MockComponent: React.FC = () => {
    return <Text />;
  };

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

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    const Component = withSpinner(MockComponent, 200);
    const tree = renderer.create(
      <Provider store={mockStore()}>
        <MemoryRouter>
          <Component />
        </MemoryRouter>
      </Provider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render correctly with timer', () => {
    const Component = withSpinner(MockComponent, 200);
    const tree = renderer.create(
      <Provider store={mockStore()}>
        <MemoryRouter>
          <Component />
        </MemoryRouter>
      </Provider>,
    );
    jest.advanceTimersByTime(200);
    expect(tree.toJSON).toMatchSnapshot();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  it('should render correctly loding false', () => {
    const useStateMock: any = (init: boolean) => [init, jest.fn()];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const Component = withSpinner(MockComponent, 200);
    const tree = renderer.create(
      <Provider store={mockStore()}>
        <MemoryRouter>
          <Component />
        </MemoryRouter>
      </Provider>,
    );
    jest.advanceTimersByTime(300);
    expect(tree.toJSON).toMatchSnapshot();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});

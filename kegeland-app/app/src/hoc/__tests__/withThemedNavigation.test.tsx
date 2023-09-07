import React from 'react';
import {View} from 'react-native';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';

import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import withThemedNavigation from '~hoc/withThemedNavigation';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Test withThemedNavigation-hoc', () => {
  const MockComponent: React.FC<any> = (props) => {
    return <View testID="MockComponent" {...props} />;
  };

  it('should render correctly', () => {
    const Component = withThemedNavigation(MockComponent);

    const component = render(
      <Provider store={mockStore(initialStore)}>
        <Component />
      </Provider>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

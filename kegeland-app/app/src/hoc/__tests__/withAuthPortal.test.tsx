import React from 'react';
import {Text} from 'react-native';
import {cloneDeep, set} from 'lodash';

import withAuthPortal from '~hoc/withAuthPortal';
import {render} from '~utils/test-utils';
import {initialState as initialAuthState} from '~state/ducks/auth/auth.reducer';
import {initialState as initialAppState} from '~state/ducks/app/app.reducer';
import {AuthState} from '~state/ducks/auth/auth.interface';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import {AnchorRoute, AppState} from '~state/ducks/app/app.interface';

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

describe('Test withAuthPortal-hoc', () => {
  const MockComponent: React.FC = () => {
    return <Text />;
  };

  it('should render correctly', () => {
    const Component = withAuthPortal(MockComponent);
    const component = render(<Component />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Navigate when user is signed in', () => {
    const authState: AuthState = {
      ...initialAuthState,
      isSignedIn: true,
    };
    const state = set(cloneDeep(initialStore), 'auth', authState);

    it('should navigate Home if no anchor route is defined', () => {
      const store = mockStore(state);
      const Component = withAuthPortal(MockComponent);
      render(<Component />, {wrapperProps: {store}});
      expect(mockedNavigate).toBeCalledWith('DeviceStack', {screen: 'Devices'});
    });

    it('should navigate to anchor route if anchor route is defined', () => {
      const anchorRoute: AnchorRoute<'SettingsStack'> = [
        'SettingsStack',
        {screen: 'Settings'},
      ];
      const appState: AppState = {...initialAppState, anchorRoute};
      const store = mockStore(set(cloneDeep(state), 'app', appState));
      const Component = withAuthPortal(MockComponent);
      render(<Component />, {wrapperProps: {store}});
      expect(mockedNavigate).toBeCalledWith(...anchorRoute);
    });
  });
});

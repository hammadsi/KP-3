import {merge} from 'lodash';
import React from 'react';

import {AuthState} from '~state/ducks/auth/auth.interface';
import {initialState} from '~state/ducks/auth/auth.reducer';
import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import {render} from '~utils/test-utils';

import SettingsScreen from '../SettingsScreen';

describe('Test SettingsScreen-component', () => {
  const errorSpy = jest
    .spyOn(global.console, 'error')
    .mockImplementation(() => {});
  afterAll(() => {
    errorSpy.mockRestore();
  });
  it('should render correctly', () => {
    const props: any = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    const component = <SettingsScreen {...props} />;
    const tree = render(component);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render correctly when user is signed in', () => {
    const props: any = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    const authState: AuthState = {
      ...initialState,
      isSignedIn: true,
      authUser: {email: 'test@test.no', id: 'fq3rdq313'},
    };
    const store = mockStore(merge({auth: authState}, initialStore));
    const component = <SettingsScreen {...props} />;
    const tree = render(component, {wrapperProps: {store}});
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

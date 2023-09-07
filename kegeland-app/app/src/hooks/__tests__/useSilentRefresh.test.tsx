import React from 'react';
import {renderHook} from '@testing-library/react-hooks/native';
import {Provider} from 'react-redux';
import {cloneDeep, map, set} from 'lodash';
import {waitFor as jestWaitFor, act} from '@testing-library/react-native';

import {initialStore, mockStore} from '~state/ducks/__mocks__/store.mock';
import {initialState} from '~state/ducks/auth/auth.reducer';
import {AuthState} from '~state/ducks/auth/auth.interface';
import useSilentRefresh from '~hooks/useSilentRefresh';
import * as storage from '~utils/storage';
import * as apiCaller from '~utils/apiCaller';
import {REFRESH_INTERVAL_MS} from '~constants/auth';
import {signOutUser, silentRefresh} from '~state/ducks/auth/auth.actions';

jest.useFakeTimers();
describe('Test useDeviceSelector-hook', () => {
  const setIntervalSpy = jest.spyOn(global, 'setInterval');
  const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
  beforeAll(() => {
    jest
      .spyOn(storage, 'retrieveToken')
      .mockImplementation(() => Promise.resolve('saopkdas'));
    jest
      .spyOn(storage, 'storeTokens')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(storage, 'removeTokens')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve());
  });
  it('should silent refresh if signed in', async () => {
    const authState: AuthState = {
      ...initialState,
      isSignedIn: true,
      authUser: {email: 'test@test.no', id: 'fadpokqw'},
    };
    const store = mockStore(set(cloneDeep(initialStore), 'auth', authState));
    renderHook(() => useSilentRefresh(), {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    const expectedActions = [silentRefresh.fulfilled.type];
    await jestWaitFor(() => {
      expect(map(store.getActions(), 'type')).toStrictEqual(expectedActions);
    });

    expect(setIntervalSpy).toBeCalledTimes(1);
  });

  it('should silent refresh by given interval time', async () => {
    const authState: AuthState = {
      ...initialState,
      isSignedIn: true,
      authUser: {email: 'test@test.no', id: 'fadpokqw'},
    };
    const store = mockStore(set(cloneDeep(initialStore), 'auth', authState));
    renderHook(() => useSilentRefresh(), {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <Provider store={store}>{children}</Provider>
      ),
    });
    jest.advanceTimersByTime(REFRESH_INTERVAL_MS);
    const expectedActions = [
      silentRefresh.fulfilled.type,
      silentRefresh.fulfilled.type,
    ];
    await jestWaitFor(() => {
      expect(map(store.getActions(), 'type')).toStrictEqual(expectedActions);
    });
    expect(setIntervalSpy).toBeCalledTimes(1);
  });

  it('should clear interval if user signs out', async () => {
    const authState: AuthState = {
      ...initialState,
      isSignedIn: true,
      authUser: {email: 'test@test.no', id: 'fadpokqw'},
    };
    const store = mockStore(set(cloneDeep(initialStore), 'auth', authState));
    renderHook(() => useSilentRefresh(), {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <Provider store={store}>{children}</Provider>
      ),
    });
    await act(() =>
      store
        .dispatch(signOutUser() as any)
        .then(() => jest.advanceTimersByTime(REFRESH_INTERVAL_MS)),
    );

    const expectedActions = [
      silentRefresh.fulfilled.type,
      signOutUser.fulfilled.type,
    ];
    expect(map(store.getActions(), 'type').sort()).toEqual(
      expectedActions.sort(),
    );

    expect(clearIntervalSpy).toBeCalledTimes(1);
  });

  it('should not silent refresh if signed out', async () => {
    const store = mockStore(initialStore);
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    renderHook(() => useSilentRefresh(), {
      wrapper: ({children}: {children: React.ReactNode}) => (
        <Provider store={store}>{children}</Provider>
      ),
    });
    expect(map(store.getActions(), 'type')).toEqual([]);
    expect(dispatchSpy).not.toBeCalled();
    expect(setIntervalSpy).not.toBeCalled();
  });
});

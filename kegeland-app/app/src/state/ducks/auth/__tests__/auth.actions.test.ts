import loginResponse, {
  signInCredentials,
  signUpCredentials,
} from '~state/ducks/__mocks__/auth.mocks';
import {store} from '~state/store';
import * as apiCaller from '~utils/apiCaller';
import * as storage from '~utils/storage';

import {
  resetPassword,
  signInUser,
  signOutUser,
  signUpUser,
  silentRefresh,
} from '../auth.actions';

describe('Test auth-actions', () => {
  it('signInUser should correctly POST @ "/auth/login"', async () => {
    const storageSpy = jest
      .spyOn(storage, 'storeTokens')
      .mockImplementation(() => Promise.resolve());
    const apiSpy = jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve(loginResponse));
    await store.dispatch(signInUser(signInCredentials));
    expect(apiSpy).toBeCalledWith({
      url: 'auth/login',
      data: signInCredentials,
      method: 'POST',
    });
    expect(storageSpy).toBeCalledWith(loginResponse.tokens);
  });

  it('signOutUser should correctly POST @ "/auth/logout"', async () => {
    const storageSpy = jest
      .spyOn(storage, 'removeTokens')
      .mockImplementation(() => Promise.resolve());
    const apiSpy = jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve());
    await store.dispatch(signOutUser());
    expect(apiSpy).toBeCalledWith({
      url: 'auth/logout',
      method: 'POST',
    });
    expect(storageSpy).toBeCalled();
  });

  it('signOutUser should revoke tokens on fail', async () => {
    const storageSpy = jest
      .spyOn(storage, 'removeTokens')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.reject(new Error('Error')));
    await store.dispatch(signOutUser());
    expect(storageSpy).toBeCalled();
  });

  it('signUpUser should correctly POST @ "/auth/register"', async () => {
    const storageSpy = jest
      .spyOn(storage, 'storeTokens')
      .mockImplementation(() => Promise.resolve());
    const apiSpy = jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve(loginResponse));
    await store.dispatch(signUpUser(signUpCredentials));
    expect(apiSpy).toBeCalledWith({
      url: 'auth/register',
      data: signUpCredentials,
      method: 'POST',
    });
    expect(storageSpy).toBeCalledWith(loginResponse.tokens);
  });

  it('silentRefresh should correctly POST @ "/auth/refresh"', async () => {
    const data = {refreshToken: 'refresh'};
    jest
      .spyOn(storage, 'retrieveToken')
      .mockImplementation(() => Promise.resolve(data.refreshToken));
    const apiSpy = jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve(data));
    await store.dispatch(silentRefresh());
    expect(apiSpy).toBeCalledWith({
      url: 'auth/refresh',
      data,
      method: 'POST',
    });
  });

  it('silentRefresh should not POST @ "/auth/refresh" when tokens are missing', async () => {
    const data = {refreshToken: 'refresh'};
    jest
      .spyOn(storage, 'retrieveToken')
      .mockImplementation(() => Promise.resolve(null));
    const apiSpy = jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve(data));
    await store.dispatch(silentRefresh());
    expect(apiSpy).toBeCalledTimes(0);
  });

  it('resetPassword should correctly POST @ "/auth/reset"', async () => {
    const apiSpy = jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve());
    await store.dispatch(resetPassword({email: signInCredentials.email}));
    expect(apiSpy).toBeCalledWith({
      url: 'auth/reset',
      data: {email: signInCredentials.email},
      method: 'POST',
    });
  });
});

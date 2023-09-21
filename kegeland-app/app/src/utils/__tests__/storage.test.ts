import AsyncStorage from '@react-native-async-storage/async-storage';

import * as storage from '~utils/storage';
import {Token} from '~constants/auth';
import {mockTokens} from '~state/ducks/__mocks__/auth.mocks';

describe('Test async storage', () => {
  const {accessToken, idToken, refreshToken} = mockTokens;
  const keyValuePairs: Record<string, string> = {
    '@access_token': accessToken,
    '@id_token': idToken,
    '@refresh_token': refreshToken,
  };
  const getItemSpy = jest
    .spyOn(AsyncStorage, 'getItem')
    .mockImplementation((token: string) => {
      return Promise.resolve(keyValuePairs[token] || null);
    });

  it('storeTokens should store all tokens', async () => {
    const storageSpy = jest
      .spyOn(AsyncStorage, 'multiSet')
      .mockImplementation(() => Promise.resolve());

    await storage.storeTokens(mockTokens);
    const expectedCall = [
      ['@access_token', accessToken],
      ['@id_token', idToken],
      ['@refresh_token', refreshToken],
    ];
    expect(storageSpy).toBeCalled();
    const call = storageSpy.mock.calls[0][0];
    expect(call).toEqual(expectedCall);
  });

  it('storeTokens should throw error if rejected', async () => {
    jest
      .spyOn(AsyncStorage, 'multiSet')
      .mockImplementation(() => Promise.reject(new Error()));
    await expect(storage.storeTokens(mockTokens)).rejects.toThrowError();
  });

  it('retrieveToken should return token if found', async () => {
    const token = await storage.retrieveToken(Token.ACCESS_TOKEN);
    expect(getItemSpy).toBeCalled();
    expect(token).toEqual(accessToken);
  });

  it('retrieveToken should return null if no token is found', async () => {
    const token = await storage.retrieveToken('132131231' as Token);
    expect(token).toBeNull();
  });

  it('retrieveTokens should return all tokens stored', async () => {
    jest.spyOn(AsyncStorage, 'multiGet').mockImplementation(() =>
      Promise.resolve([
        ['@access_token', accessToken],
        ['@id_token', idToken],
        ['@refresh_token', refreshToken],
      ]),
    );
    const res = await storage.retrieveTokens();
    expect(res).toEqual(keyValuePairs);
  });

  it('retrieveTokens should throw error if rejected', async () => {
    jest
      .spyOn(AsyncStorage, 'multiGet')
      .mockImplementation(() => Promise.reject(new Error()));
    await expect(storage.retrieveTokens()).rejects.toThrowError();
  });

  it('removeTokens should throw error if rejected', async () => {
    jest
      .spyOn(AsyncStorage, 'multiRemove')
      .mockImplementation(() => Promise.reject(new Error()));
    await expect(storage.removeTokens()).rejects.toThrowError();
  });
});

/* istanbul ignore file */
import {reduce} from 'lodash';

import {Token} from '~constants/auth';
import {mockTokens} from '~state/ducks/__mocks__/auth.mocks';
const {accessToken, idToken, refreshToken} = mockTokens;
const keyValuePairs: Record<string, string> = {
  '@access_token': accessToken,
  '@id_token': idToken,
  '@refresh_token': refreshToken,
};
const error = new Error('error');

export const storeTokens = async ({
  _accessToken,
  _idToken,
  _refreshToken,
}: any) => {
  return Promise.resolve();
};

export const retrieveToken = async (token: Token) => {
  if (token in keyValuePairs) {
    return Promise.resolve(keyValuePairs[token]);
  }
  return Promise.reject(error);
};

export const retrieveTokens = async () =>
  Promise.resolve(
    reduce(
      keyValuePairs,
      (prev, curr) => {
        const [key, val] = curr;
        if (val) {
          prev[key as Token] = val;
        }
        return prev;
      },
      {} as Record<Token, string>,
    ),
  );

export const removeTokens = async () => Promise.resolve();

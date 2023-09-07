import AsyncStorage from '@react-native-async-storage/async-storage';
import {reduce} from 'lodash';

import {Token} from '~constants/auth';
import {AuthTokens} from '~state/ducks/auth/auth.interface';

/**
 * Stores auth tokens in async storage for persistent storage.
 * @param param0 the auth tokens to store
 * @see {@link AuthTokens}
 */
export const storeTokens = async ({
  accessToken,
  idToken,
  refreshToken,
}: AuthTokens) => {
  await AsyncStorage.multiSet([
    ['@access_token', accessToken],
    ['@id_token', idToken],
    ['@refresh_token', refreshToken],
  ]).catch((err) => {
    if (err) {
      throw new Error('Failed to set tokens');
    }
  });
};

/**
 * Retrieves a token from storage if it exists
 * @param token key of the token to retrieve
 * @returns token if found, else null
 * @see {@link Token}
 */
export const retrieveToken = async (token: Token) => {
  let res = null;
  res = await AsyncStorage.getItem(token);
  return res;
};

/**
 * Retrieves all auth tokens stored in async storage
 * @returns all auth tokens in storage
 * @see {@link AuthTokens}
 */
export const retrieveTokens = async () => {
  let values = null;
  values = await AsyncStorage.multiGet(Object.values(Token))
    .then((res) =>
      reduce(
        res,
        (prev, curr) => {
          const [key, val] = curr;
          if (val) {
            prev[key as Token] = val;
          }
          return prev;
        },
        {} as Record<Token, string>,
      ),
    )
    .catch(() => {
      throw new Error('Failed to retrieve tokens');
    });
  return values;
};

/**
 * Removes all tokens stored in async storage
 */
export const removeTokens = async () => {
  await AsyncStorage.multiRemove(Object.values(Token)).catch(() => {
    throw new Error('Failed to remove tokens');
  });
};

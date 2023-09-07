/* istanbul ignore file */
import {isEqual} from 'lodash';

import loginResponse, {
  mockTokens,
  signInCredentials,
  signUpCredentials,
} from '~state/ducks/__mocks__/auth.mocks';

import {ApiCallerProps} from './apiCaller';
const error = new Error('Error');
export const apiCaller = (config: ApiCallerProps) => {
  switch (config.url) {
    case 'auth/login':
      if (isEqual(config.data, signInCredentials)) {
        return Promise.resolve(loginResponse);
      }
      return Promise.reject(error);
    case 'auth/register':
      if (isEqual(config.data, signUpCredentials)) {
        return Promise.resolve(loginResponse);
      }
      return Promise.reject(error);
    case 'auth/refresh':
      return Promise.resolve(mockTokens);
    default:
      return Promise.resolve();
  }
};

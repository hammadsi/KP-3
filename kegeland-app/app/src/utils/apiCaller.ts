import axios, {AxiosRequestConfig} from 'axios';
import {API_URL} from '@env';

import {Token} from '~constants/auth';

import {isApiError} from './isApiError';
import {retrieveToken} from './storage';

const URL =
  process.env.NODE_ENV === 'integration'
    ? 'https://tdt4290-api.herokuapp.com'
    : API_URL;

// Initiate a base axios-instance for api calls
export const httpInstance = axios.create({
  timeout: 5000,
});

// Request interceptor for adding auth-tokens before the request is sent
export const interceptFulfilled = async (config: AxiosRequestConfig) => {
  const token = await retrieveToken(Token.ACCESS_TOKEN);
  if (token) {
    config.headers!.Authorization = 'Bearer ' + token;
  }
  return config;
};

// Request interceptor for handling errors
export const interceptRejected = async (err: any) => Promise.reject(err);

httpInstance.interceptors.request.use(interceptFulfilled, interceptRejected);

export type ApiCallerProps = Pick<
  AxiosRequestConfig,
  'url' | 'method' | 'data' | 'params'
>;
/**
 * Util function for handling calls to the api
 * @param config configuration for the api call
 * @returns http response
 * @see {@link ApiCallerProps}
 */
export const apiCaller = <T = unknown>(config: ApiCallerProps) =>
  httpInstance
    .request<T>({baseURL: `${URL}/api/`, ...config})
    .then((res) => res.data)
    .catch((err) => {
      // Check if response is an Error class
      if (err instanceof Error) {
        // Check if response is an AxiosError
        if (axios.isAxiosError(err)) {
          // Check if response  is an ApiError
          if (err.response && isApiError(err)) {
            let message = err.response.data.message;
            // If the error message is an array, select the first
            if (message instanceof Array) {
              message = message[0];
            }
            throw new Error(message);
          }
        }
        throw new Error(err.message);
      }
      throw new Error('An unknown error has occurred');
    });

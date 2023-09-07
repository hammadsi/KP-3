import axios, { AxiosError } from 'axios';

/**
 * Util function for testing whether an error payload is of type AxiosError.
 * Supports a generic type T for strongly typed error payload
 * @param err the error payload to test
 * @returns strongly types axios error if test passes
 */
export function isAxiosError<T>(err: any): err is AxiosError<T> {
  return axios.isAxiosError(err);
}

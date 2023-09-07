import {API_URL} from '@env';
import {AxiosError} from 'axios';

import {
  apiCaller,
  httpInstance,
  interceptFulfilled,
  interceptRejected,
} from '~utils/apiCaller';

import * as storage from '../storage';

describe('Test apiCaller', () => {
  it('apiCaller should send basic request', async () => {
    const httpMock = jest
      .spyOn(httpInstance, 'request')
      .mockImplementation(() => Promise.resolve({data: httpInstance}));
    const config = {url: 'test', method: 'POST'};
    await apiCaller(config);
    const reqConfig = httpMock.mock.calls[0][0];
    expect(reqConfig).toStrictEqual({
      baseURL: `${API_URL}/api/`,
      url: 'test',
      method: 'POST',
    });
  });

  it('apiCaller should send request with params', async () => {
    const httpMock = jest
      .spyOn(httpInstance, 'request')
      .mockImplementation(() => Promise.resolve({data: httpInstance}));
    const config = {url: 'test', method: 'POST', params: {userId: '231d1'}};
    await apiCaller(config);
    const reqConfig = httpMock.mock.calls[0][0];
    expect(reqConfig).toStrictEqual({
      baseURL: `${API_URL}/api/`,
      ...config,
    });
  });

  it('apiCaller should send request with body', async () => {
    const httpMock = jest
      .spyOn(httpInstance, 'request')
      .mockImplementation(() => Promise.resolve({data: httpInstance}));
    const config = {url: 'test', method: 'POST', data: {userId: '231d1'}};
    await apiCaller(config);
    const reqConfig = httpMock.mock.calls[0][0];
    expect(reqConfig).toStrictEqual({
      baseURL: `${API_URL}/api/`,
      ...config,
    });
  });

  it('apiCaller interceptor should add auth-token to header if it exists', async () => {
    const token = 'asiofjsaijd';
    jest
      .spyOn(storage, 'retrieveToken')
      .mockImplementation(() => Promise.resolve(token));
    const res = await interceptFulfilled({headers: {}});
    expect(res.headers!.Authorization).toEqual(`Bearer ${token}`);
  });

  it('apiCaller interceptor should not add auth-token to header if it does not exist', async () => {
    jest
      .spyOn(storage, 'retrieveToken')
      .mockImplementation(() => Promise.resolve(null));
    const res = await interceptFulfilled({headers: {}});
    expect(res.headers!.Authorization).toBe(undefined);
  });

  it('apiCaller interceptor should reject on error', async () => {
    await expect(interceptRejected(new Error('Error'))).rejects.toThrowError();
  });

  it('apiCaller should reject with type axios error on invalid requests', async () => {
    const axiosErr = new AxiosError(
      'Error',
      '400',
      {},
      {},
      {
        config: {},
        headers: {},
        status: 400,
        statusText: 'Axios Error',
        request: {},
        data: {},
      },
    );
    jest
      .spyOn(httpInstance, 'request')
      .mockImplementation(() => Promise.reject(axiosErr));
    const config = {url: 'test', method: 'GET'};
    await expect(apiCaller(config)).rejects.toThrow(
      new Error(axiosErr.message),
    );
  });

  it('apiCaller should reject with type api error on bad requests', async () => {
    const axiosErr = new AxiosError(
      'Error',
      '400',
      {},
      {},
      {
        config: {},
        headers: {},
        status: 400,
        statusText: 'Axios Error',
        request: {},
        data: {message: 'Missing parameter "foo"'},
      },
    );
    jest
      .spyOn(httpInstance, 'request')
      .mockImplementation(() => Promise.reject(axiosErr));
    const config = {url: 'test', method: 'GET'};
    await expect(apiCaller(config)).rejects.toThrow(
      new Error(axiosErr.response?.data.message),
    );
  });

  it('apiCaller should reject with the first error message received from the api', async () => {
    const axiosErr = new AxiosError(
      'Error',
      '400',
      {},
      {},
      {
        config: {},
        headers: {},
        status: 400,
        statusText: 'Axios Error',
        request: {},
        data: {message: ['Missing parameter "foo"', 'Missing parameter "bar"']},
      },
    );
    jest
      .spyOn(httpInstance, 'request')
      .mockImplementation(() => Promise.reject(axiosErr));
    const config = {url: 'test', method: 'GET'};
    await expect(apiCaller(config)).rejects.toThrow(
      new Error(axiosErr.response?.data.message[0]),
    );
  });

  it('apiCaller should reject with error on internal errors', async () => {
    const err = new Error('error');
    jest
      .spyOn(httpInstance, 'request')
      .mockImplementation(() => Promise.reject(err));
    const config = {url: 'test', method: 'GET'};
    await expect(apiCaller(config)).rejects.toThrow(err);
  });

  it('apiCaller should reject with a default error on unknown errors', async () => {
    jest
      .spyOn(httpInstance, 'request')
      // eslint-disable-next-line prefer-promise-reject-errors
      .mockImplementation(() => Promise.reject());
    const config = {url: 'test', method: 'GET'};
    await expect(apiCaller(config)).rejects.toThrowError();
  });
});

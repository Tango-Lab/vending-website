import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';

import { AuthStorageKey } from '@/constants/Storage';
import { getAccessToken } from '@/utils/LocalStorage';

import { message } from '../utils';

/**
 * @template T the type of the action's `response` tag.
 */
function sendRequest<T, D = any>(config: AxiosRequestConfig<D>): Promise<T> {
  const defaultHeaders = {};
  config.withCredentials = true;
  config.headers = Object.assign({}, config.headers, defaultHeaders);

  return axios<any, AxiosResponse<T>>(config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch((err) => {
      if (err.response == null) {
        err.errorCode = -1;
        throw err;
      } else {
        const statusCode = err.response?.data?.errorCode;
        if (statusCode === 2001) {
          localStorage.removeItem(AuthStorageKey);
          message.error(err.response?.data.message);
        }
        throw err.response.data;
      }
    });
}

/**
 * @template T the type of the action's `response`.
 * @template Q the type of the query's `param` in URL `Optionals`.
 */
export function GET<T, Q = any>(url: string, params?: Q, headers?: RawAxiosRequestHeaders): Promise<T> {
  return sendRequest({ method: 'GET', url, headers, params });
}

/**
 * @template T the type of the action's `response` tag.
 * @template B the type of the body's `param` JSON.
 */
export function POST<T, B = any>(url: string, data: B, headers?: RawAxiosRequestHeaders): Promise<T> {
  return sendRequest({ method: 'POST', data, url, headers });
}

/**
 * @template T the type of the action's `response`.
 * @template Q the type of the query's `param` in URL `Optionals`.
 */
export function GETBlobWithToken<T, Q = any>(url: string, params?: Q, headers = {}): Promise<T> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw Error('Missing AccessToken');
  }
  Object.assign(headers, {
    Authorization: 'Bearer ' + accessToken.accessToken,
  });
  return sendRequest({ method: 'GET', url, headers, params, responseType: 'blob' });
}

/**
 * @template T the type of the action's `response` tag.
 * @template B the type of the body's `param` JSON.
 */
export function POSTWithToken<T, B = any>(url: string, data: B, headers = {}): Promise<T> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw Error('Missing AccessToken');
  }
  Object.assign(headers, {
    Authorization: 'Bearer ' + accessToken.accessToken,
  });
  return sendRequest({ method: 'POST', data, url, headers });
}

/**
 * @template T the type of the action's `response` tag.
 * @template B the type of the body's `param` JSON.
 */
export function GETWithToken<T, B = any>(url: string, params: B, headers = {}, signal?: AbortSignal): Promise<T> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw Error('Missing AccessToken');
  }
  Object.assign(headers, {
    Authorization: 'Bearer ' + accessToken.accessToken,
  });
  return sendRequest({ method: 'GET', url, params, headers, signal });
}

/**
 * @template T the type of the action's `response` tag.
 * @template B the type of the body's `param` JSON.
 */
export function PUTWithToken<T, B = any>(url: string, data: B, headers = {}): Promise<T> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw Error('Missing AccessToken');
  }
  Object.assign(headers, {
    Authorization: 'Bearer ' + accessToken.accessToken,
  });
  return sendRequest({ method: 'PUT', data, url, headers });
}

/**
 * @template T the type of the action's `response` tag.
 * @template B the type of the body's `param` JSON.
 */
export function PUT<T, B = any>(url: string, data: B, headers: RawAxiosRequestHeaders): Promise<T> {
  return sendRequest({ method: 'PUT', data, url, headers });
}

/**
 * @template T the type of the action's `response` tag.
 * @template B the type of the body's `param` JSON.
 */
export function DELETE<T, B = any>(url: string, data: B, headers: RawAxiosRequestHeaders): Promise<T> {
  return sendRequest({ method: 'DELETE', data, url, headers });
}

/**
 * @template T the type of the action's `response` tag.
 * @template B the type of the body's `param` JSON.
 */
export function DELETEWithToken<T, B = any>(url: string, data?: B, headers: RawAxiosRequestHeaders = {}): Promise<T> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw Error('Missing AccessToken');
  }
  Object.assign(headers, {
    Authorization: 'Bearer ' + accessToken.accessToken,
  });
  return sendRequest({ method: 'DELETE', data, url, headers });
}

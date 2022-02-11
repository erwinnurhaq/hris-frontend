import MESSAGES from '../constants/genericMessages.json';
import { userLogout, userRefresh } from '../services/auth.service';

const jsonHeaders = { Accept: 'application/json', 'Content-Type': 'application/json' };

let queue: { (): void }[] = [];
let isRefreshingToken = false;

function refreshAndRetryFetch() {
  isRefreshingToken = true;
  // get refresh token
  userRefresh()
    .then(() => {
      isRefreshingToken = false;
      // retry fetch
      queue = queue.filter((promise) => promise());
    })
    .catch(() => userLogout());
}

async function responseMiddleware<T>(response: Response, options?: RequestInit): Promise<T> {
  const status: number = response.status || 500;
  const result: T & { message?: string } = await response.json();

  // if the access token is invalid
  if (status === 401 && result?.message === 'Invalid Token') {
    if (!isRefreshingToken) {
      // sync
      refreshAndRetryFetch();
    }

    // add queue fetch
    return new Promise((resolve) => {
      queue.push(() => {
        resolve(fetch(response.url, options).then((response2) => responseMiddleware<T>(response2)));
      });
    });
  }

  if (status >= 400) {
    throw new Error(result?.message || 'Error');
  }

  return result;
}

function catchMiddleware(err: any): string {
  return err?.message || MESSAGES.GENERIC_ERROR_MESSAGE;
}

export async function get<T>(endpoint: string, options: any = {}): Promise<T> {
  try {
    const opt: RequestInit = {
      method: 'GET',
      credentials: 'include',
      ...options,
    };
    const response: Response = await fetch(endpoint, opt);
    const result: T = await responseMiddleware<T>(response, opt);
    return result;
  } catch (err: unknown) {
    throw catchMiddleware(err);
  }
}

export async function post<T, B = any>(
  endpoint: string,
  headers: any = {},
  body: B,
  isJSON = true,
  formData: any = {}
): Promise<T> {
  try {
    const customHeaders = isJSON ? { ...jsonHeaders, ...headers } : headers;
    const opt: RequestInit = {
      method: 'POST',
      credentials: 'include',
      headers: customHeaders,
      body: isJSON ? JSON.stringify(body || {}) : formData,
    };
    const response: Response = await fetch(endpoint, opt);
    const result: T = await responseMiddleware<T>(response, opt);
    return result;
  } catch (err: unknown) {
    throw catchMiddleware(err);
  }
}

export async function put<T, B = any>(
  endpoint: string,
  headers: any = {},
  body: B,
  isJSON = true,
  formData: any = {}
): Promise<T> {
  try {
    const customHeaders = isJSON ? { ...jsonHeaders, ...headers } : headers;
    const opt: RequestInit = {
      method: 'PUT',
      credentials: 'include',
      headers: customHeaders,
      body: isJSON ? JSON.stringify(body || {}) : formData,
    };
    const response: Response = await fetch(endpoint, opt);
    const result: T = await responseMiddleware<T>(response, opt);
    return result;
  } catch (err: unknown) {
    throw catchMiddleware(err);
  }
}

export async function patch<T, B = any>(
  endpoint: string,
  headers: any = {},
  body: B,
  isJSON = true,
  formData: any = {}
): Promise<T> {
  try {
    const customHeaders = isJSON ? { ...jsonHeaders, ...headers } : headers;
    const opt: RequestInit = {
      method: 'PATCH',
      credentials: 'include',
      headers: customHeaders,
      body: isJSON ? JSON.stringify(body || {}) : formData,
    };

    const response: Response = await fetch(endpoint, opt);
    const result: T = await responseMiddleware<T>(response, opt);
    return result;
  } catch (err: unknown) {
    throw catchMiddleware(err);
  }
}

export async function del<T>(endpoint: string, headers: any = {}, options: any = {}): Promise<T> {
  try {
    const opt: RequestInit = {
      method: 'DELETE',
      credentials: 'include',
      headers,
      ...options,
    };

    const response: Response = await fetch(endpoint, opt);
    const result: T = await responseMiddleware<T>(response, opt);
    return result;
  } catch (err: unknown) {
    throw catchMiddleware(err);
  }
}

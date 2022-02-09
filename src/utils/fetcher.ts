import MESSAGES from '../constants/genericMessages.json';
import { userLogout, userRefresh } from '../services/auth';

const jsonHeaders = { Accept: 'application/json', 'Content-Type': 'application/json' };

let queue: { (): void }[] = [];
let isRefreshingToken = false;

function refreshAndRetryFetch() {
  isRefreshingToken = true;
  // get refresh token
  userRefresh().then(() => {
    isRefreshingToken = false;
    // retry fetch
    queue = queue.filter((promise) => promise());
  });
}

// async function responseMiddleware<T>(response: Response, options?: RequestInit): Promise<T> {
//   const status: number = response.status || 500;
//   const result: T & { message?: string } = await response.json();

//   // if the access token is invalid
//   if (status === 401 && result?.message === 'Invalid Token') {
//     if (response.url.includes('/auth/refresh') || !options) {
//       // Logout
//       await userLogout();
//       throw new Error(result?.message || 'Error');
//     }

//     if (!isRefreshingToken) {
//       refreshAndRetryFetch();
//     }

//     // add queue fetch
//     return new Promise((resolve) => {
//       queue.push(() => {
//         resolve(fetch(response.url, options).then((response2) => responseMiddleware<T>(response2)));
//       });
//     });
//   }

//   if (status > 400) {
//     throw new Error(result?.message || 'Error');
//   }

//   return result;
// }
function responseMiddleware<T>(
  resolve: (value: T | PromiseLike<T>) => void,
  response: Response,
  result: T & { message?: string },
  options?: RequestInit
) {
  const status: number = response.status || 500;

  // if the access token is invalid
  if (status === 401 && result?.message === 'Invalid Token') {
    if (response.url.includes('/auth/refresh') || !options) {
      // Logout
      return userLogout();
    }

    if (!isRefreshingToken) {
      refreshAndRetryFetch();
    }

    // add queue fetch
    return new Promise((resolve2) => {
      queue.push(() => {
        let responseObj2: Response;
        resolve2(
          fetch(response.url, options)
            .then((response2) => {
              responseObj2 = response2;
              return response2.json() as Promise<T>;
            })
            .then((result2) => responseMiddleware<T>(resolve, responseObj2, result2, options))
        );
      });
    });
  }

  if (status > 400) {
    throw new Error(result?.message || 'Error');
  }

  resolve(result);
}

// function catchMiddleware(err: any) {
//   return err instanceof SyntaxError || err.type === 'invalid-json'
//     ? MESSAGES.GENERIC_ERROR_MESSAGE
//     : err.message;
// }

function catchMiddleware(err: any, reject: (reason: string) => void) {
  reject(
    err instanceof SyntaxError || err.type === 'invalid-json'
      ? MESSAGES.GENERIC_ERROR_MESSAGE
      : err.message
  );
}

// export async function get<T>(endpoint: string, options: any = {}): Promise<T> {
//   try {
//     const opt: RequestInit = {
//       method: 'GET',
//       credentials: 'include',
//       ...options,
//     };
//     const response: Response = await fetch(endpoint, opt);
//     const result: T = await responseMiddleware<T>(response, opt);
//     return result;
//   } catch (err: any) {
//     throw catchMiddleware(err)
//   }
// }

export function get<T>(endpoint: string, options: any = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    const opt: RequestInit = {
      method: 'GET',
      credentials: 'include',
      ...options,
    };
    let responseObj: Response;

    fetch(endpoint, opt)
      .then((response) => {
        responseObj = response;
        return response.json() as Promise<T>;
      })
      .then((result) => responseMiddleware<T>(resolve, responseObj, result, opt))
      .catch((err) => catchMiddleware(err, reject));
  });
}

// export function post<T, B>(
//   endpoint: string,
//   headers: any = {},
//   body: B,
//   isJSON = true,
//   formData: any = {}
// ): Promise<T> {
//   return new Promise((resolve, reject) => {
//     const customHeaders = isJSON ? { ...jsonHeaders, ...headers } : headers;
//     const opt: RequestInit = {
//       method: 'POST',
//       credentials: 'include',
//       headers: customHeaders,
//       body: isJSON ? JSON.stringify(body || {}) : formData,
//     };
//     let responseObj: Response;

//     fetch(endpoint, opt)
//       .then((response) => {
//         responseObj = response;
//         return response.json() as Promise<T>;
//       })
//       .then((result) => responseMiddleware<T>(result, resolve, responseObj, opt))
//       .catch((err) => catchMiddleware(err, reject));
//   });
// }

// export function put<T, B>(
//   endpoint: string,
//   headers: any = {},
//   body: B,
//   isJSON = true,
//   formData: any = {}
// ): Promise<T> {
//   return new Promise((resolve, reject) => {
//     const customHeaders = isJSON ? { ...jsonHeaders, ...headers } : headers;
//     const opt: RequestInit = {
//       method: 'PUT',
//       credentials: 'include',
//       headers: customHeaders,
//       body: isJSON ? JSON.stringify(body || {}) : formData,
//     };
//     let responseObj: Response;

//     fetch(endpoint, opt)
//       .then((response) => {
//         responseObj = response;
//         return response.json() as Promise<T>;
//       })
//       .then((result) => responseMiddleware<T>(result, resolve, responseObj, opt))
//       .catch((err) => catchMiddleware(err, reject));
//   });
// }

// export function patch<T, B>(
//   endpoint: string,
//   headers: any = {},
//   body: B,
//   isJSON = true,
//   formData: any = {}
// ): Promise<T> {
//   return new Promise((resolve, reject) => {
//     const customHeaders = isJSON ? { ...jsonHeaders, ...headers } : headers;
//     const opt: RequestInit = {
//       method: 'PATCH',
//       credentials: 'include',
//       headers: customHeaders,
//       body: isJSON ? JSON.stringify(body || {}) : formData,
//     };
//     let responseObj: Response;

//     fetch(endpoint, opt)
//       .then((response) => {
//         responseObj = response;
//         return response.json() as Promise<T>;
//       })
//       .then((result) => responseMiddleware<T>(result, resolve, responseObj, opt))
//       .catch((err) => catchMiddleware(err, reject));
//   });
// }

// export function del<T>(endpoint: string, headers: any = {}, options: any = {}): Promise<T> {
//   return new Promise((resolve, reject) => {
//     const opt: RequestInit = {
//       method: 'DELETE',
//       credentials: 'include',
//       headers,
//       ...options,
//     };
//     let responseObj: Response;

//     fetch(endpoint, opt)
//       .then((response) => {
//         responseObj = response;
//         return response.json() as Promise<T>;
//       })
//       .then((result) => responseMiddleware<T>(result, resolve, responseObj, opt))
//       .catch((err) => catchMiddleware(err, reject));
//   });
// }

// function userLogin({ username, password }) {
//   return new Promise((resolve, reject) => {
//     fetcher
//       .post(`${BASE_PIC_URL}${PIC_C}/login`, { credentials: 'include' }, { username, password })
//       .then(([result, responseObj]) => {
//         if (responseObj.status === 400) {
//           reject(new Error('Invalid email address or password.'));
//           return;
//         }
//         if (responseObj.status > 400) {
//           reject(new Error(result.error || result.message || GENERIC_ERROR_MESSAGE));
//           return;
//         }
//         resolve(result);
//       })
//       .catch(err => reject(err));
//   });
// }

import { IFetchSuccess } from '../interfaces/common';
import { get } from '../utils/fetcher';

export function userLogout() {
  return get<IFetchSuccess>(`http://localhost:2000/auth/logout`, {
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-store' },
    credentials: 'include',
  }).then(() => {
    window.location.replace('/auth/login');
  });
}

export function userRefresh() {
  return get<IFetchSuccess>(`http://localhost:2000/auth/refresh`, {
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-store' },
    credentials: 'include',
  });
}

// function requestResetPassword({ email }) {
//   return new Promise((resolve, reject) => {
//     fetcher
//       .post(`${BASE_PIC_URL}${PIC_C}/resetpassword`, {}, { email })
//       .then(([result, responseObj]) => {
//         if (responseObj.status === 400) {
//           reject(new Error('Request failed. Please provide your registered email.'));
//           return;
//         }
//         if (responseObj.status > 400) {
//           reject(new Error(result.error || result.message || GENERIC_ERROR_MESSAGE));
//           return;
//         }
//         resolve(result);
//       })
//       .catch(err => reject(err));
//   });
// }

// function resetPassword({ token, password }) {
//   return new Promise((resolve, reject) => {
//     fetcher
//       .put(`${BASE_PIC_URL}${PIC_C}/resetpassword?t=${token}`, {}, { password })
//       .then(([result, responseObj]) => {
//         if (responseObj.status >= 400) {
//           reject(new Error(result.error || result.message || GENERIC_ERROR_MESSAGE));
//           return;
//         }
//         resolve(result);
//       })
//       .catch(err => reject(err));
//   });
// }

// function getSetupAccountData({ token }) {
//   return new Promise((resolve, reject) => {
//     fetcher
//       .get(`${BASE_PIC_URL}${PIC_Q}/invitation?t=${token}`)
//       .then(([result, responseObj]) => {
//         if (responseObj.status >= 400) {
//           reject(new Error(result.error || result.message || GENERIC_ERROR_MESSAGE));
//           return;
//         }
//         resolve(result);
//       })
//       .catch(err => reject(err));
//   });
// }

// function setupAccount({ token, password }) {
//   return new Promise((resolve, reject) => {
//     fetcher
//       .put(`${BASE_PIC_URL}${PIC_C}/invitation?t=${token}`, {}, { password })
//       .then(([result, responseObj]) => {
//         if (responseObj.status >= 400) {
//           reject(new Error(result.error || result.message || GENERIC_ERROR_MESSAGE));
//           return;
//         }
//         resolve(result);
//       })
//       .catch(err => reject(err));
//   });
// }

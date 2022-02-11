import { BASE_URL } from '../constants/baseURL';
import { get, post } from '../utils/fetcher';
import { IFetchSuccess } from '../interfaces/common.interface';
import { IAuthLoginDto, IAuthResetPassDto, IAuthSignupDto } from './auth.dto';
import MESSAGES from '../constants/genericMessages.json';

export async function userRefresh() {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'GET',
      credentials: 'include',
      headers: { Pragma: 'no-cache', 'Cache-Control': 'no-store' },
    });
    const resJson = await res.json();
    if (res.status !== 200) {
      throw new Error(resJson.message);
    }
    return true;
  } catch (err: any) {
    throw err?.message || MESSAGES.GENERIC_ERROR_MESSAGE;
  }
}

export function userLogout() {
  return get<IFetchSuccess>(`${BASE_URL}/auth/logout`, {
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-store' },
  }).then(() => {
    window.location.replace('/auth/login');
  });
}

export function userLogin(data: IAuthLoginDto) {
  return post<IFetchSuccess, IAuthLoginDto>(`${BASE_URL}/auth/login`, {}, data);
}

export function userSignup(data: IAuthSignupDto) {
  return post<IFetchSuccess, IAuthSignupDto>(`${BASE_URL}/auth/signup`, {}, data);
}

export function userResetPassword(data: IAuthResetPassDto) {
  return post<IFetchSuccess, IAuthResetPassDto>(
    `${BASE_URL}/auth/reset?token=${data.token}`,
    {},
    { password: data.password }
  );
}

export function userRequestResetPassword(email: string) {
  return get<IFetchSuccess>(`${BASE_URL}/auth/reset-request?email=${email}`);
}

export function userActivate(token: string) {
  return post<IFetchSuccess>(`${BASE_URL}/auth/activate?token=${token}`, {}, {});
}

export function userActivateResend(token: string) {
  return get<IFetchSuccess>(`${BASE_URL}/auth/activate-resend?email=${token}`);
}

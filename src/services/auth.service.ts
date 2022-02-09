import { BASE_URL } from '../constants/baseURL';
import { get, post } from '../utils/fetcher';
import { IFetchSuccess } from '../interfaces/common.interface';
import { IAuthLoginDto, IAuthResetPassDto, IAuthSignupDto } from './auth.dto';

export function userRefresh() {
  return get<IFetchSuccess>(`${BASE_URL}/auth/refresh`, {
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-store' },
  });
}

export async function userLogout() {
  await get<IFetchSuccess>(`${BASE_URL}/auth/logout`, {
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-store' },
  });
  window.location.replace('/auth/login');
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
  return post<IFetchSuccess, any>(`${BASE_URL}/auth/activate?token=${token}`, {}, {});
}

export function userActivateResend(token: string) {
  return get<IFetchSuccess>(`${BASE_URL}/auth/activate-resend?email=${token}`);
}

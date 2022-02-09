import { BASE_URL } from '../constants/baseURL';
import { get, post } from '../utils/fetcher';
import { IFetchSuccess } from '../interfaces/common';

export interface IUserLoginDto {
  email: string;
  password: string;
}

export interface IUserRequestResetDto {
  email: string;
}

export interface IUserResetDto {
  token: string;
  password: string;
}

export async function userLogout(): Promise<void> {
  await get<IFetchSuccess>(`${BASE_URL}/auth/logout`, {
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-store' },
  });
  window.location.replace('/auth/login');
}

export function userRefresh(): Promise<IFetchSuccess> {
  return get<IFetchSuccess>(`${BASE_URL}/auth/refresh`, {
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-store' },
  });
}

export function userLogin(data: IUserLoginDto) {
  return post<IFetchSuccess>(`${BASE_URL}/auth/login`, {}, data);
}

export function userRequestReset(data: IUserRequestResetDto) {
  return get<IFetchSuccess>(`${BASE_URL}/auth/reset-request?email=${data.email}`);
}

export function userReset(data: IUserResetDto) {
  return post<IFetchSuccess>(
    `${BASE_URL}/auth/reset?token=${data.token}`,
    {},
    { password: data.password }
  );
}

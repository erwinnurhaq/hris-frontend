import { BASE_URL } from '../constants/baseURL';
import { get, post } from '../utils/fetcher';
import { IFetchSuccess } from '../interfaces/common';

export interface IGetUserSetupDataDto {
  token: string;
}

export interface IGetUserSetupDataRes {
  name: string;
  email: string;
  school: { name: string; [key: string]: any };
}

export interface IUserSetupDto {
  token: string;
  password: string;
}

export function getUserSetupData(data: IGetUserSetupDataDto) {
  return get<IGetUserSetupDataRes>(`${BASE_URL}/users/invited-user?token=${data.token}`);
}

export function setupAccount(data: IUserSetupDto) {
  return post<IFetchSuccess>(
    `${BASE_URL}/users/invite-signup?token=${data.token}`,
    {},
    { password: data.password }
  );
}

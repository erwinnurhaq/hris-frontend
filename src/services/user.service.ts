import { BASE_URL } from '../constants/baseURL';
import { del, get, patch, post } from '../utils/fetcher';
import getQueryString from '../utils/getQueryString';
import { IFetchSuccess, IPaginationDto } from '../interfaces/common.interface';
import { IInvitedUserData, IUser, IUserDetail } from '../interfaces/user.interface';
import { IInvitedSignupDto, IInviteUserDto, IPatchMeDto, IPatchUserDto } from './user.dto';

export function getUsers(query: IPaginationDto) {
  return get<IUser[]>(`${BASE_URL}/users${getQueryString(query)}`);
}

export function getUserDetail(id: number) {
  return get<IUserDetail>(`${BASE_URL}/users/${id}`);
}

export function patchUser(id: number, data: IPatchUserDto) {
  return patch<IUser, IPatchUserDto>(`${BASE_URL}/users/${id}`, {}, data);
}

export function deleteUser(id: number) {
  return del<IFetchSuccess>(`${BASE_URL}/users/${id}`);
}

export function inviteUser(data: IInviteUserDto) {
  return post<IUser, IInviteUserDto>(`${BASE_URL}/users/invite`, {}, data);
}

export function inviteUserResend(email: string) {
  return get<IFetchSuccess>(`${BASE_URL}/users/invite-resend?email=${email}`);
}

export function getInvitedUserData(token: string) {
  return get<IInvitedUserData>(`${BASE_URL}/users/invited-user?token=${token}`);
}

export function invitedSignup(data: IInvitedSignupDto) {
  return post<IFetchSuccess, IInvitedSignupDto>(
    `${BASE_URL}/users/invited-signup?token=${data.token}`,
    {},
    { password: data.password }
  );
}

export function getMe() {
  return get<IUserDetail>(`${BASE_URL}/users/me`);
}

export function patchMe(data: IPatchMeDto) {
  return patch<IUserDetail, IPatchMeDto>(`${BASE_URL}/users/me`, {}, data);
}

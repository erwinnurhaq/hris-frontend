import { BASE_URL } from '../constants/baseURL';
import { get, post } from '../utils/fetcher';
import getQueryString from '../utils/getQueryString';
import { IFetchSuccess, IPaginationDto } from '../interfaces/common.interface';
import { IInvitedUserData, IUser, IUserDetail } from '../interfaces/user.interface';
import { IInvitedSignupDto, IInviteUserDto } from './user.dto';

export function getUsers(query: IPaginationDto) {
  return get<IUser[]>(`${BASE_URL}/users${getQueryString(query)}`);
}

export function getUserDetail(id: number) {
  return get<IUserDetail>(`${BASE_URL}/users/${id}`);
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

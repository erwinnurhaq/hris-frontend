import { BASE_URL } from 'constants/baseURL';
import { get, patch } from 'utils/fetcher';
import { IUserDetail } from 'interfaces/user.interface';
import { IPatchMeDto } from './me.dto';

export function getMe() {
  return get<IUserDetail>(`${BASE_URL}/users/me`);
}

export function patchMe(data: IPatchMeDto) {
  return patch<IUserDetail, IPatchMeDto>(`${BASE_URL}/users/me`, {}, data);
}

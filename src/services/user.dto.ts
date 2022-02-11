import { TRole } from '../interfaces/user.interface';

export interface IInviteUserDto {
  name: string;
  email: string;
  schoolId: number;
  role: TRole;
}

export interface IInvitedSignupDto {
  token?: string;
  password: string;
}

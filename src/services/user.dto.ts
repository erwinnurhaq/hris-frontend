import { Role } from '../interfaces/user.interface';

export interface IInviteUserDto {
  name: string;
  email: string;
  schoolId: number;
  role: Role;
}

export interface IInvitedSignupDto {
  token?: string;
  password: string;
}

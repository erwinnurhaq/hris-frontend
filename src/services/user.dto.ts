import { TEducationalStage, TRole } from 'interfaces/user.interface';

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

export interface IPatchUserDto {
  role: TRole;
}

export interface IPatchMeDto {
  name?: string;
  address?: string;
  birthdate?: string;
  lastEducation?: {
    educationalStage: TEducationalStage;
    major: string;
    campus: string;
    graduateYear: number;
  };
  bankAccount?: {
    name: string;
    number: string;
  };
}

export interface IAuthLoginDto {
  email: string;
  password: string;
}

export interface IAuthSignupDto {
  name: string;
  email: string;
  password: string;
  school: string;
}

export interface IAuthResetPassDto {
  token?: string;
  password: string;
}

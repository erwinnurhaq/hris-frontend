import { IErrorPassInfo } from '../Signup/signup.interface';
import { FormEvent } from 'react';

export type TResetPasswordFormElements = 'password' | 'confirmPassword';

export interface IUseResetPassword {
  isLoading: boolean;
  isSuccess: boolean;
  error: IErrorPassInfo;
  onReset: (ev: FormEvent<HTMLFormElement>) => Promise<void>;
  onGoToLogin: () => void;
}

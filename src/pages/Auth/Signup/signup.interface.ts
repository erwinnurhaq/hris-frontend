import { FormEvent, RefObject } from 'react';

export type TSignupAlertSection =
  | 'success_signup'
  | 'success_invited_signup'
  | 'error_invited_data'
  | undefined;
export type TSignupFormElements = 'name' | 'email' | 'school' | 'password' | 'confirmPassword';

export interface IErrorPassInfo {
  password: string;
  confirmPassword: string;
}

export interface IUserRef {
  email?: string;
  name?: string;
  school?: string;
}

export interface IUseSignup {
  userRef: RefObject<IUserRef | undefined>;
  formRef: RefObject<HTMLFormElement>;
  isInitialLoading: boolean;
  isLoading: boolean;
  isInvited: boolean;
  alertSection: TSignupAlertSection;
  error: IErrorPassInfo;
  onRegister: (ev: FormEvent<HTMLFormElement>) => Promise<void>;
  onResendActivation: () => Promise<void>;
}

export interface ISignupAlertSections {
  alertSection: 'success_signup' | 'success_invited_signup' | 'error_invited_data';
  onResendActivation: () => Promise<void>;
  isLoading: boolean;
}

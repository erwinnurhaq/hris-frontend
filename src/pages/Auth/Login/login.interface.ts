import { FormEvent } from 'react';

export type TLoginFormElements = 'email' | 'password';

export interface IUseLogin {
  isLoading: boolean;
  onLogin: (ev: FormEvent<HTMLFormElement>) => void;
}

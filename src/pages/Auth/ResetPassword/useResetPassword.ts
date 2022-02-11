import { FormEvent, useEffect, useRef, useState } from 'react';
import { message } from 'antd';

import { TFormElements } from '../../../interfaces/common.interface';
import { userResetPassword } from '../../../services/auth.service';
import { IErrorPassInfo } from '../Signup/useSetupAccount';

export type TResetPasswordFormElements = 'password' | 'confirmPassword';

export interface IUseResetPassword {
  isLoading: boolean;
  isSuccess: boolean;
  error: IErrorPassInfo;
  onReset: (ev: FormEvent<HTMLFormElement>) => Promise<void>;
  onGoToLogin: () => void;
}

function useResetPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<IErrorPassInfo>({
    password: '',
    confirmPassword: '',
  });

  const isMounted = useRef<boolean>(false);
  const paramsRef = useRef<URLSearchParams | undefined>(undefined);

  function checkPasswordValid(password: string, confirmPassword: string) {
    const currentError: IErrorPassInfo = {
      password: '',
      confirmPassword: '',
    };
    if (password.length < 6) {
      currentError.password = 'Password length min. 6 character';
    }
    if (confirmPassword !== password) {
      currentError.confirmPassword = 'Confirm password is not match';
    }
    return currentError;
  }

  async function onReset(ev: FormEvent<HTMLFormElement>) {
    if (ev.preventDefault) ev.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const token = paramsRef.current?.get('token');

      if (!token) {
        message.error('Token is required');
        setIsLoading(false);
        return;
      }

      const form = ev.currentTarget.elements as TFormElements<TResetPasswordFormElements>;
      const errorPassword: IErrorPassInfo = checkPasswordValid(
        form.password.value,
        form.confirmPassword.value
      );

      if (errorPassword.password || errorPassword.confirmPassword) {
        setError(errorPassword);
        setIsLoading(false);
        return;
      }

      await userResetPassword({ password: form.password.value, token });

      if (!isMounted.current) return;

      message.success('Successfully reset password.');
      setIsSuccess(true);
      setIsLoading(false);
    } catch (err: unknown) {
      if (!isMounted.current) return;

      message.error(err as string);
      setIsLoading(false);
    }
  }

  function onGoToLogin() {
    window.location.replace('/auth/login');
  }

  useEffect(() => {
    isMounted.current = true;
    paramsRef.current = new URLSearchParams(window.location.search);
    return () => {
      isMounted.current = false;
    };
  }, []); // eslint-disable-line

  return { isLoading, isSuccess, error, onReset, onGoToLogin };
}

export default useResetPassword;

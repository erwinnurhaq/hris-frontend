import { FormEvent, useEffect, useRef, useState } from 'react';
import { message } from 'antd';

import { TFormElements } from '../../../interfaces/common.interface';
import { userResetPassword } from '../../../services/auth.service';
import { IErrorPassInfo } from '../Signup/signup.interface';
import { TResetPasswordFormElements } from './resetpassword.interface';

function useResetPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<IErrorPassInfo>({
    password: '',
    confirmPassword: '',
  });

  const isMounted = useRef<boolean>(false);
  const tokenRef = useRef<string | null>(null);

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
    if (!tokenRef.current) {
      message.error('Token is required');
      return;
    }

    try {
      setIsLoading(true);

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

      await userResetPassword({ password: form.password.value, token: tokenRef.current });

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
    tokenRef.current = new URLSearchParams(window.location.search).get('token');
    return () => {
      isMounted.current = false;
    };
  }, []); // eslint-disable-line

  return { isLoading, isSuccess, error, onReset, onGoToLogin };
}

export default useResetPassword;

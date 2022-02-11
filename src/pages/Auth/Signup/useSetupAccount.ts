import { useState, useRef, useEffect, FormEvent } from 'react';
import { message } from 'antd';

import { userSignup } from '../../../services/auth.service';
import { TFormElements } from '../../../interfaces/common.interface';

export type TSignupFormElements = 'name' | 'email' | 'school' | 'password' | 'confirmPassword';

export interface IErrorPassInfo {
  password: string;
  confirmPassword: string;
}

export interface IUseSignup {
  isLoading: boolean;
  isSuccess: boolean;
  error: IErrorPassInfo;
  onSave: (ev: FormEvent<HTMLFormElement>) => Promise<void>;
  onResendActivation: () => Promise<void>;
}

function useSignup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<IErrorPassInfo>({
    password: '',
    confirmPassword: '',
  });

  const isMounted = useRef<boolean>(false);
  const emailRef = useRef<string>('');

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

  async function onSave(ev: FormEvent<HTMLFormElement>) {
    if (ev.preventDefault) ev.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const form = ev.currentTarget.elements as TFormElements<TSignupFormElements>;
      const errorPassword: IErrorPassInfo = checkPasswordValid(
        form.password.value,
        form.confirmPassword.value
      );

      if (errorPassword.password || errorPassword.confirmPassword) {
        setError(errorPassword);
        setIsLoading(false);
        return;
      }

      await userSignup({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        school: form.school.value,
      });

      if (!isMounted.current) return;

      emailRef.current = form.email.value;
      message.success('Email successfully sent.');
      setIsSuccess(true);
      setIsLoading(false);
    } catch (err: unknown) {
      if (!isMounted.current) return;

      message.error(err as string);
      setIsLoading(false);
    }
  }

  async function onResendActivation() {
    console.log(emailRef.current);
  }

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []); // eslint-disable-line

  return {
    isLoading,
    isSuccess,
    error,
    onSave,
    onResendActivation,
  };
}

export default useSignup;

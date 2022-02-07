import { useState, useRef, useEffect, FormEvent } from 'react';
import { message } from 'antd';

import MESSAGES from '../../../constants/genericMessages.json';

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
      const form = new FormData(ev.target as HTMLFormElement);
      const values = Object.fromEntries(form);
      const errorPassword = checkPasswordValid(
        values.password as string,
        values.confirmPassword as string
      );

      if (errorPassword.password || errorPassword.confirmPassword) {
        setError(errorPassword);
        setIsLoading(false);
        return;
      }

      if (!isMounted.current) return;

      emailRef.current = values.email as string;
      message.success('Email successfully sent.');
      setIsSuccess(true);
      setIsLoading(false);
    } catch (err: any) {
      if (!isMounted.current) return;

      setIsLoading(false);
      message.error(err.message || MESSAGES.GENERIC_ERROR_MESSAGE);
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

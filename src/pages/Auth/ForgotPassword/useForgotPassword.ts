import { useState, useRef, useEffect, FormEvent } from 'react';
import { message } from 'antd';

import { IFormDataValues } from '../../../interfaces/common.interface';
import { userRequestResetPassword } from '../../../services/auth.service';

export interface IUseForgotPassword {
  isLoading: boolean;
  isSuccess: boolean;
  onSendRequest: (ev: FormEvent<HTMLFormElement>) => Promise<void> | void;
}

function useForgotPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const isMounted = useRef<boolean>(false);

  async function onSendRequest(ev: FormEvent<HTMLFormElement>) {
    if (ev.preventDefault) ev.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const form: FormData = new FormData(ev.target as HTMLFormElement);
      const values: IFormDataValues = Object.fromEntries(form);

      await userRequestResetPassword(values.email);
      if (!isMounted.current) return;

      message.success('Email successfully sent.');
      setIsSuccess(true);
      setIsLoading(false);
    } catch (err: unknown) {
      if (!isMounted.current) return;

      message.error(err as string);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    isLoading,
    isSuccess,
    onSendRequest,
  };
}

export default useForgotPassword;

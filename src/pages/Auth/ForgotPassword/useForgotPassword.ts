import { useState, useRef, useEffect, FormEvent } from 'react';
import { message } from 'antd';

import MESSAGES from '../../../constants/genericMessages.json';

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
      if (!isMounted.current) return;

      message.success('Email successfully sent.');
      setIsSuccess(true);
      setIsLoading(false);
    } catch (err: any) {
      if (!isMounted.current) return;

      setIsLoading(false);
      message.error(err.message || MESSAGES.GENERIC_ERROR_MESSAGE);
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

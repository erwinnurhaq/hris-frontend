import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import { TFormElements } from 'interfaces/common.interface';
import { userRequestResetPassword } from 'services/auth.service';

function useForgotPassword() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const isMounted = useRef<boolean>(false);

  async function onSendRequest(ev: FormEvent<HTMLFormElement>) {
    if (ev.preventDefault) ev.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const form = ev.currentTarget.elements as TFormElements<'email'>;

      await userRequestResetPassword(form.email.value);
      if (!isMounted.current) return;

      message.success('Email berhasil dikirim.');
      setIsSuccess(true);
      setIsLoading(false);
    } catch (err: unknown) {
      if (!isMounted.current) return;

      message.error(err as string);
      setIsLoading(false);
    }
  }

  function onGoToLogin() {
    navigate('/auth/login');
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
    onGoToLogin,
  };
}

export default useForgotPassword;

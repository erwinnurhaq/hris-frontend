import { useEffect, useRef, useState, FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { message } from 'antd';

import { userLogin } from '../../../services/auth.service';
import { IFormDataValues } from '../../../interfaces/common.interface';

export interface IUseLogin {
  isLoading: boolean;
  onLogin: (ev: FormEvent<HTMLFormElement>) => void;
}

function useLogin() {
  const navigate: NavigateFunction = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isMounted = useRef<boolean>(false);

  async function onLogin(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    try {
      setIsLoading(true);
      const form: FormData = new FormData(ev.target as HTMLFormElement);
      const values: IFormDataValues = Object.fromEntries(form);

      await userLogin({ email: values.email, password: values.password });
      if (!isMounted.current) return;

      setIsLoading(false);
      navigate('/dashboard');
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

  return { isLoading, onLogin };
}

export default useLogin;

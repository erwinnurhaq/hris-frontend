import { FormEvent, useEffect, useRef, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { message } from 'antd';

import { userLogin } from '../../../services/auth.service';
import { TFormElements } from '../../../interfaces/common.interface';
import { TLoginFormElements } from './login.interface';

function useLogin() {
  const navigate: NavigateFunction = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isMounted = useRef<boolean>(false);

  async function onLogin(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    try {
      setIsLoading(true);
      const form = ev.currentTarget.elements as TFormElements<TLoginFormElements>;

      await userLogin({ email: form.email.value, password: form.password.value });
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

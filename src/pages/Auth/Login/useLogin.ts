import { useEffect, useRef, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export interface IUseLogin {
  isLoading: boolean;
  onLogin: (ev: FormEvent<HTMLFormElement>) => void;
}

function useLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);

  async function onLogin(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    try {
      setIsLoading(true);
      const form = new FormData(ev.target as HTMLFormElement);
      const values = Object.fromEntries(form);
      console.log(values);
      const res = await fetch('http://localhost:2000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!isMounted.current) return;
      if (res.status !== 200) {
        throw await res.json();
      }
      setIsLoading(false);
      navigate('/dashboard');
    } catch (err: any) {
      if (!isMounted.current) return;

      message.error(err.message);
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

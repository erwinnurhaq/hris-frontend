import { useEffect, useRef, useState } from 'react';
import { userRefresh } from '../../services/auth.service';

function useAuthLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const isMounted = useRef<boolean>(false);
  const withNotAuthRoute = ['/auth/login', '/auth/signup'];

  async function checkAuth() {
    if (!withNotAuthRoute.includes(window.location.pathname)) {
      setIsAuth(false);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      await userRefresh();
      if (!isMounted.current) return;

      setIsAuth(true);
      setIsLoading(false);
    } catch (err) {
      if (!isMounted.current) return;

      setIsAuth(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log('mounted auth layout');
    isMounted.current = true;
    checkAuth();
    return () => {
      console.log('unmounted auth layout');
      isMounted.current = false;
    };
  }, []);
  return { isLoading, isAuth };
}

export default useAuthLayout;

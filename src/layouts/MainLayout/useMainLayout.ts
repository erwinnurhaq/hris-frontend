import { useEffect, useRef, useState } from 'react';
import { userRefresh } from '../../services/auth.service';

function useMainLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const isMounted = useRef<boolean>(false);

  const checkAuth = async () => {
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
  };

  useEffect(() => {
    console.log('mounted main layout');
    isMounted.current = true;
    checkAuth();
    return () => {
      console.log('unmounted main layout');
      isMounted.current = false;
    };
  }, []);

  return { isLoading, isAuth };
}

export default useMainLayout;

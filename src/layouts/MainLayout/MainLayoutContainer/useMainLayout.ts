import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';

import { userRefresh } from 'services/auth.service';
import { getMe } from 'services/user.service';

import { MainLayoutContext } from '../MainLayoutContext';

function useMainLayout() {
  const location = useLocation();
  const { me, updateUserMe } = useContext(MainLayoutContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const isMounted = useRef<boolean>(false);

  const isShowWelcome = useMemo(
    () => me && me.role === 'MASTER' && !me.school?.type && location.pathname !== '/welcome',
    [me, location]
  );

  async function checkAuth() {
    try {
      await userRefresh();
      if (!isMounted.current) return;

      setIsAuth(true);
    } catch (err) {
      if (!isMounted.current) return;

      setIsAuth(false);
      throw err;
    }
  }

  async function initialLoad() {
    try {
      setIsLoading(true);

      await checkAuth();
      const user = await getMe();
      if (!isMounted.current) return;

      updateUserMe(user);
      setIsLoading(false);
    } catch (err) {
      if (!isMounted.current) return;

      message.error(err as string);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log('mounted main layout');
    isMounted.current = true;
    initialLoad();
    return () => {
      console.log('unmounted main layout');
      isMounted.current = false;
    };
  }, []);

  return { isLoading, isAuth, isShowWelcome };
}

export default useMainLayout;

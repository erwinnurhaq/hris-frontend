import { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userRefresh } from '../../services/auth.service';

function MainLayout() {
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

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="main-layout">
      <div>Side bar</div>
      <Outlet />
    </div>
  );
}

export default MainLayout;

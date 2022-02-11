import { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd';

import AuthLayoutBg from '../../assets/images/auth-layout-bg.jpg';
import HRISLogo from '../../assets/images/hris-logo.png';
import { userRefresh } from '../../services/auth.service';
import './index.css';

function AuthLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const isMounted = useRef<boolean>(false);
  const withNotAuthRoute = ['/auth/login', '/auth/signup'];

  const checkAuth = async () => {
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
  };

  useEffect(() => {
    console.log('mounted auth layout');
    isMounted.current = true;
    checkAuth();
    return () => {
      console.log('unmounted auth layout');
      isMounted.current = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container-block" style={{ minHeight: '100vh' }}>
        <Spin />
      </div>
    );
  }

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="auth-layout">
      <div className="auth-layout__left">
        <img src={AuthLayoutBg} alt="auth-layout-bg" />
      </div>
      <div className="auth-layout__right">
        <img src={HRISLogo} alt="prospace-logo" />
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

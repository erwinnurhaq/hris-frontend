import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthLayoutBg from '../../assets/images/auth-layout-bg.jpg';
import HRISLogo from '../../assets/images/hris-logo.png';
import './index.css';

function AuthLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:2000/auth/refresh', { credentials: 'include' });
      if (res.status !== 200) {
        throw await res.json();
      }
      setIsAuth(true);
      setIsLoading(false);
    } catch (err) {
      setIsAuth(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('mounted auth layout');
    checkAuth();
    return () => {
      console.log('unmounted auth layout');
    };
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
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

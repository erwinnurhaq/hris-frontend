import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd';

import AuthLayoutBg from '../../assets/images/auth-layout-bg.jpg';
import HRISLogo from '../../assets/images/hris-logo.png';
import useAuthLayout from './useAuthLayout';
import './index.css';

function AuthLayout() {
  const { isLoading, isAuth } = useAuthLayout();

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

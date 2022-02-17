import { Navigate, Outlet } from 'react-router-dom';

import AuthLayoutBg from '../../assets/images/auth-layout-bg.jpg';
import HRISLogo from '../../assets/images/hris-logo.png';
import LoaderBlock from '../../components/Loader/LoaderBlock';
import useAuthLayout from './useAuthLayout';
import './style.css';

function AuthLayout() {
  const { isLoading, isAuth } = useAuthLayout();

  if (isLoading) {
    return <LoaderBlock style={{ minHeight: '100vh' }} />;
  }

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="auth-layout">
      <div className="auth-layout__left small-scrollbar">
        <img src={HRISLogo} alt="prospace-logo" />
        <Outlet />
      </div>
      <div className="auth-layout__right">
        <img src={AuthLayoutBg} alt="auth-layout-bg" />
      </div>
    </div>
  );
}

export default AuthLayout;

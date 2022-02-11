import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd';
import useMainLayout from './useMainLayout';

function MainLayout() {
  const { isLoading, isAuth } = useMainLayout();

  if (isLoading) {
    return (
      <div className="loading-container-block" style={{ minHeight: '100vh' }}>
        <Spin />
      </div>
    );
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

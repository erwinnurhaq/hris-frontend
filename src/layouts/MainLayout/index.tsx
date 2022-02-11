import { Navigate, Outlet } from 'react-router-dom';

import LoaderBlock from '../../components/Loader/LoaderBlock';
import useMainLayout from './useMainLayout';

function MainLayout() {
  const { isLoading, isAuth } = useMainLayout();

  if (isLoading) {
    return <LoaderBlock style={{ minHeight: '100vh' }} />;
  }

  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="main-layout" style={{}}>
      <div>Side bar</div>
      <Outlet />
    </div>
  );
}

export default MainLayout;

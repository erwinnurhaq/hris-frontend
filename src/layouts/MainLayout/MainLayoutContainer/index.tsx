import { Navigate } from 'react-router-dom';

import LoaderBlock from '../../../components/Loader/LoaderBlock';
import Sidebar from './components/Sidebar';
import useMainLayout from './useMainLayout';
import './style.css';

function MainLayoutContainer({ children }: { children: JSX.Element | JSX.Element[] }) {
  const { isLoading, isAuth, isShowWelcome } = useMainLayout();

  if (isLoading) {
    return <LoaderBlock style={{ minHeight: '100vh' }} />;
  }

  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }

  if (isShowWelcome) {
    return <Navigate to="/welcome" />;
  }

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
}

export default MainLayoutContainer;

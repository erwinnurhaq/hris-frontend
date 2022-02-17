import { Outlet } from 'react-router-dom';

import MainLayoutContainer from './MainLayoutContainer';
import { MainLayoutProvider } from './MainLayoutContext';

function MainLayout() {
  return (
    <MainLayoutProvider>
      <MainLayoutContainer>
        <Outlet />
      </MainLayoutContainer>
    </MainLayoutProvider>
  );
}

export default MainLayout;

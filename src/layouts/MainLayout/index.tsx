import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function MainLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

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
    console.log('mounted main layout');
    checkAuth();
    return () => {
      console.log('unmounted main layout');
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

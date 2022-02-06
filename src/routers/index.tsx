import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layout/Outlet
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

// Auth Pages
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import ForgotPassword from '../pages/Auth/ForgotPassword';

// Main Pages
import Dashboard from '../pages/Dashboard';
import ManageUser from '../pages/Manage/User';
import NotFound from '../pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage" element={<Outlet />}>
            <Route path="" element={<Navigate to="/manage/user" />} />
            <Route path="user" element={<ManageUser />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="" element={<Navigate to="/auth/login" />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot_password" element={<ForgotPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

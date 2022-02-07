import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Dashboard = () => {
  const navigate: NavigateFunction = useNavigate();
  async function onLogout() {
    try {
      await fetch('http://localhost:2000/auth/logout', { credentials: 'include' });
      navigate('/auth/login');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;

import { Button, message } from 'antd';
import { get } from '../../utils/fetcher';
import { userLogout } from '../../services/auth.service';

const Dashboard = () => {
  async function onLogout() {
    try {
      await userLogout();
    } catch (err) {
      console.log(err);
    }
  }
  async function getUser() {
    try {
      const res = await Promise.all([
        get('http://localhost:2000/users?page=1&size=10'),
        get('http://localhost:2000/users/12'),
      ]);
      console.log(res);
    } catch (err) {
      console.log(err);
      message.error(err as string);
    }
  }

  return (
    <div>
      <h1 onClick={getUser}>Dashboard</h1>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;

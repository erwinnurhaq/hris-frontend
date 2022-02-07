import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';

import useLogin, { IUseLogin } from './useLogin';
import '../style.css';

function Login() {
  const { isLoading, onLogin }: IUseLogin = useLogin();

  return (
    <form className="auth-pages-container animation-fade-in-top" onSubmit={onLogin}>
      <h5 className="auth-pages__title">Login</h5>
      <div className="auth-pages__input">
        <p>Email:</p>
        <Input type="email" name="email" placeholder="Enter your email" required />
      </div>
      <div className="auth-pages__input">
        <p>Password:</p>
        <Input.Password
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="login__forgot">
        <Link to="/auth/forgot_password">Forgot Password</Link>
      </div>
      <Button
        htmlType="submit"
        type="primary"
        className="auth-pages__button login__button"
        loading={isLoading}
      >
        Login
      </Button>
      <div>
        <p>
          No account? <Link to="/auth/signup">Sign Up</Link>
        </p>
      </div>
    </form>
  );
}

export default Login;

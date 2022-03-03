import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';

import useLogin from './useLogin';
import { IUseLogin } from './login.interface';
import '../style.css';

function Login() {
  const { isLoading, onLogin }: IUseLogin = useLogin();

  return (
    <form className="auth-pages-container animation-fade-in-top" onSubmit={onLogin}>
      <h5 className="auth-pages__title">Login</h5>
      <div className="auth-pages__input">
        <p>Email:</p>
        <Input
          type="email"
          name="email"
          placeholder="Masukkan email anda"
          disabled={isLoading}
          required
        />
      </div>
      <div className="auth-pages__input">
        <p>Password:</p>
        <Input.Password
          type="password"
          name="password"
          placeholder="Masukkan password anda"
          disabled={isLoading}
          required
        />
      </div>
      <div className="login__forgot">
        <Link to="/auth/forgotpassword" style={{ pointerEvents: isLoading ? 'none' : 'all' }}>
          Lupa Password
        </Link>
      </div>
      <Button
        htmlType="submit"
        type="primary"
        className="auth-pages__button login__button"
        loading={isLoading}
      >
        Masuk
      </Button>
      <div>
        <p>
          Tidak punya akun?{' '}
          <Link to="/auth/signup" style={{ pointerEvents: isLoading ? 'none' : 'all' }}>
            Registrasi
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Login;

import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';

import { ReactComponent as EmailIcon } from '../../../assets/icons/email-sent.svg';
import AlertSection from '../AlertSection';
import useForgotPassword from './useForgotPassword';
import { IUseForgotPassword } from './forgotpassword.interface';
import '../style.css';

function ForgotPassword() {
  const { isLoading, isSuccess, onSendRequest, onGoToLogin }: IUseForgotPassword =
    useForgotPassword();

  if (isSuccess) {
    return (
      <AlertSection
        title="Email Terkirim"
        description="Kami sudah mengirimkan email link untuk mereset password anda."
        buttonLabel="Kembali ke Login"
        onButtonClick={onGoToLogin}
        icon={<EmailIcon />}
      />
    );
  }

  return (
    <form className="auth-pages-container animation-fade-in-top" onSubmit={onSendRequest}>
      <h5 className="auth-pages__title forgot-password__title">Lupa Password</h5>
      <p className="forgot-password__subtitle">
        Silahkan masukkan email anda dan kami akan mengirimkan email beserta instruksi untuk mereset
        password anda.
      </p>
      <div className="auth-pages__input">
        <p>Email:</p>
        <Input
          type="email"
          name="email"
          placeholder="Masukkan email terdaftar anda"
          disabled={isLoading}
          required
        />
      </div>
      <Button
        htmlType="submit"
        type="primary"
        className="auth-pages__button forgot-password__button-send"
        loading={isLoading}
      >
        Kirim Request
      </Button>
      <Link
        className="auth-pages__button forgot-password__button-back"
        to="/auth/login"
        style={{ pointerEvents: isLoading ? 'none' : 'all' }}
      >
        Kembali to Login
      </Link>
    </form>
  );
}

export default ForgotPassword;

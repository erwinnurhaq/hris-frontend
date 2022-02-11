import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';

import { ReactComponent as EmailIcon } from '../../../assets/icons/email-sent.svg';
import AlertSection from '../AlertSection';
import useForgotPassword, { IUseForgotPassword } from './useForgotPassword';
import '../style.css';

function ForgotPassword() {
  const { isLoading, isSuccess, onSendRequest, onGoToLogin }: IUseForgotPassword =
    useForgotPassword();

  if (isSuccess) {
    return (
      <AlertSection
        title="Email Sent"
        description="We have emailed you a link to reset your password."
        buttonLabel="Go to Login"
        onButtonClick={onGoToLogin}
        icon={<EmailIcon />}
      />
    );
  }

  return (
    <form className="auth-pages-container animation-fade-in-top" onSubmit={onSendRequest}>
      <h5 className="auth-pages__title forgot-password__title">Recover Password</h5>
      <p className="forgot-password__subtitle">
        Enter your email address and we&apos;ll send you an email with instructions to reset your
        password.
      </p>
      <div className="auth-pages__input">
        <p>Email:</p>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
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
        Send Request
      </Button>
      <Link
        className="auth-pages__button forgot-password__button-back"
        to="/auth/login"
        style={{ pointerEvents: isLoading ? 'none' : 'all' }}
      >
        Back to Login
      </Link>
    </form>
  );
}

export default ForgotPassword;

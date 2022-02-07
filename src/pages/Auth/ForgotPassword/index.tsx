import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';

import { ReactComponent as EmailIcon } from '../../../assets/icons/email-sent.svg';
import AlertSection from '../AlertSection';
import useForgotPassword, { IUseForgotPassword } from './useForgotPassword';
import '../style.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const { isLoading, isSuccess, onSendRequest }: IUseForgotPassword = useForgotPassword();

  if (isSuccess) {
    return (
      <AlertSection
        className="forgot-password__email-sent"
        title="Email Sent"
        description="We have emailed you a link to reset your password."
        buttonLabel="Resend Link"
        onButtonClick={onSendRequest}
        isLoading={isLoading}
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
        <Input type="email" name="email" placeholder="Enter your email" required />
      </div>
      <Button
        htmlType="submit"
        type="primary"
        className="auth-pages__button forgot-password__button-send"
        loading={isLoading}
      >
        Send Request
      </Button>
      <Button
        type="link"
        className="auth-pages__button forgot-password__button-back"
        loading={isLoading}
        onClick={() => navigate('/auth/login')}
      >
        Back to Login
      </Button>
    </form>
  );
}

export default ForgotPassword;

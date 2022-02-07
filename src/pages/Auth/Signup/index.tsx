import { Link } from 'react-router-dom';
import { Button, Divider, Input } from 'antd';

import { ReactComponent as EmailIcon } from '../../../assets/icons/email-sent.svg';
import AlertSection from '../AlertSection';
import useSignup, { IUseSignup } from './useSetupAccount';
import '../style.css';

function Signup() {
  const { isLoading, isSuccess, error, onSave, onResendActivation }: IUseSignup = useSignup();

  if (isSuccess) {
    return (
      <AlertSection
        className="signup__email-sent"
        title="Email Sent"
        description="Please check your email box to continue the registration."
        buttonLabel="Resend Link"
        onButtonClick={onResendActivation}
        isLoading={isLoading}
        icon={<EmailIcon />}
      />
    );
  }

  return (
    <form className="auth-pages-container animation-fade-in-top" onSubmit={onSave}>
      <h5 className="auth-pages__title signup__title">Register School</h5>
      <div className="auth-pages__input">
        <p>Name:</p>
        <Input name="name" placeholder="Enter your full name" required />
      </div>
      <div className="auth-pages__input">
        <p>Email:</p>
        <Input type="email" name="email" placeholder="Enter your email" required />
      </div>
      <div className="auth-pages__input">
        <p>School Name:</p>
        <Input name="school" placeholder="Enter your school name" required />
      </div>
      <Divider plain>
        <h4 className="signup__subtitle">Create Password</h4>
      </Divider>
      <div className="auth-pages__input">
        <p>Password:</p>
        <Input.Password
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        {error.password && <small>* {error.password}</small>}
      </div>
      <div className="auth-pages__input">
        <p>Confirm Password:</p>
        <Input.Password
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          required
        />
        {error.confirmPassword && <small>* {error.confirmPassword}</small>}
      </div>
      <Button
        htmlType="submit"
        type="primary"
        className="auth-pages__button signup__button"
        loading={isLoading}
      >
        Register
      </Button>
      <Link className="auth-pages__button signup__back-button" to="/auth/login">
        Back to Login
      </Link>
    </form>
  );
}

export default Signup;

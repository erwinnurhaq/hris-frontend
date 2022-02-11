import { Link } from 'react-router-dom';
import { Button, Divider, Input, Spin } from 'antd';

import { SignupAlertSections } from './components/SignupAlertSections';
import { IUseSignup } from './signup.interface';
import useSignup from './useSetupAccount';
import '../style.css';

function Signup() {
  const {
    userRef,
    formRef,
    isInitialLoading,
    isLoading,
    isInvited,
    alertSection,
    error,
    onRegister,
    onResendActivation,
  }: IUseSignup = useSignup();

  if (isInitialLoading) {
    return (
      <div className="loading-container-block">
        <Spin tip="Loading..." />
      </div>
    );
  }

  if (alertSection) {
    return (
      <SignupAlertSections
        alertSection={alertSection}
        onResendActivation={onResendActivation}
        isLoading={isLoading}
      />
    );
  }

  return (
    <form
      className="auth-pages-container animation-fade-in-top"
      ref={formRef}
      onSubmit={onRegister}
    >
      <h5 className="auth-pages__title signup__title">Register</h5>
      <div className="auth-pages__input">
        <p>Name:</p>
        <Input
          name="name"
          placeholder="Enter your full name"
          defaultValue={userRef.current?.name || ''}
          disabled={isInvited || isLoading}
          required
        />
      </div>
      <div className="auth-pages__input">
        <p>Email:</p>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          defaultValue={userRef.current?.email || ''}
          disabled={isInvited || isLoading}
          required
        />
      </div>
      <div className="auth-pages__input">
        <p>School Name:</p>
        <Input
          name="school"
          placeholder="Enter your school name"
          defaultValue={userRef.current?.school || ''}
          disabled={isInvited || isLoading}
          required
        />
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
          disabled={isLoading}
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
          disabled={isLoading}
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
      <Link
        className="auth-pages__button signup__back-button"
        to="/auth/login"
        style={{ pointerEvents: isLoading ? 'none' : 'all' }}
      >
        Back to Login
      </Link>
    </form>
  );
}

export default Signup;

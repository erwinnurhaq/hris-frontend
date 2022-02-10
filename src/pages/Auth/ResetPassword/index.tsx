import { Button, Input } from 'antd';

import AlertSection from '../AlertSection';
import useResetPassword, { IUseResetPassword } from './useResetPassword';

function ResetPassword() {
  const { isLoading, isSuccess, error, onReset, onGoToLogin }: IUseResetPassword =
    useResetPassword();

  if (isSuccess) {
    return (
      <AlertSection
        title="Password has been reset"
        description="You can now login with your new password."
        buttonLabel="Go to Login"
        onButtonClick={onGoToLogin}
        isLoading={isLoading}
      />
    );
  }

  return (
    <form className="auth-pages-container animation-fade-in-top" onSubmit={onReset}>
      <h5 className="auth-pages__title reset-password__title">Reset Password</h5>
      <div className="auth-pages__input">
        <p>New Password:</p>
        <Input.Password
          type="password"
          name="password"
          placeholder="Enter your new password"
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
        className="auth-pages__button reset-password__button"
        loading={isLoading}
      >
        Reset
      </Button>
    </form>
  );
}

export default ResetPassword;

import { Link } from 'react-router-dom';
import { Button, Divider, Input } from 'antd';

import LoaderBlock from 'components/Loader/LoaderBlock';

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
    return <LoaderBlock text="Loading..." />;
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
      <h5 className="auth-pages__title signup__title">Registrasi</h5>
      <div className="auth-pages__input">
        <p>Nama:</p>
        <Input
          name="name"
          placeholder="Masukkan nama lengkap anda"
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
          placeholder="Masukkan email"
          defaultValue={userRef.current?.email || ''}
          disabled={isInvited || isLoading}
          required
        />
      </div>
      <div className="auth-pages__input">
        <p>Nama Sekolah:</p>
        <Input
          name="school"
          placeholder="Masukkan nama sekolah"
          defaultValue={userRef.current?.school || ''}
          disabled={isInvited || isLoading}
          required
        />
      </div>
      <Divider plain>
        <h4 className="signup__subtitle">Buat Password</h4>
      </Divider>
      <div className="auth-pages__input">
        <p>Password:</p>
        <Input.Password
          type="password"
          name="password"
          placeholder="Masukkan password"
          disabled={isLoading}
          required
        />
        {error.password && <small>* {error.password}</small>}
      </div>
      <div className="auth-pages__input">
        <p>Konfirm Password:</p>
        <Input.Password
          type="password"
          name="confirmPassword"
          placeholder="Masukkan konfirm password"
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
        Kembali ke Login
      </Link>
    </form>
  );
}

export default Signup;

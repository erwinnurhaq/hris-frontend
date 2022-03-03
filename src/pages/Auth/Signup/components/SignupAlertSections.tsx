import { useNavigate } from 'react-router-dom';

import { ReactComponent as EmailIcon } from 'assets/icons/email-sent.svg';
import { ReactComponent as CheckSuccessIcon } from 'assets/icons/check-success.svg';
import { ReactComponent as InfoIcon } from 'assets/icons/info-icon.svg';

import { SignupAlertSection } from '../useSetupAccount';
import AlertSection from '../../AlertSection';
import { ISignupAlertSections } from '../signup.interface';

export function SignupAlertSections({
  alertSection,
  onResendActivation,
  isLoading,
}: ISignupAlertSections) {
  const navigate = useNavigate();
  return (
    <>
      {alertSection === SignupAlertSection.SUCCESS_SIGNUP && (
        <AlertSection
          title="Email berhasil dikirim"
          description="Silahkan cek email anda untuk melanjutkan registrasi. Apabila email belum diterima silahkan klik tombol dibawah."
          buttonLabel="Kirim Ulang"
          onButtonClick={onResendActivation}
          isLoading={isLoading}
          icon={<EmailIcon />}
        />
      )}
      {alertSection === SignupAlertSection.SUCCESS_INVITED_SIGNUP && (
        <AlertSection
          title="Berhasil"
          description="Data user telah disimpan. Sekarang anda bisa login menggunakan email dan password anda."
          buttonLabel="Ke Login"
          onButtonClick={() => navigate('/auth/login')}
          icon={<CheckSuccessIcon />}
        />
      )}
      {alertSection === SignupAlertSection.ERROR_INVITED_DATA && (
        <AlertSection
          title="Error"
          description="Token tidak valid atau kedaluarsa. Silahkan hubungi admin sekolah anda."
          buttonLabel="Ke Login"
          onButtonClick={() => navigate('/auth/login')}
          icon={<InfoIcon width={100} height={100} />}
        />
      )}
    </>
  );
}

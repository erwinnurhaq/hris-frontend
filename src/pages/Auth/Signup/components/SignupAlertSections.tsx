import { useNavigate } from 'react-router-dom';

import { SignupAlertSection } from '../useSetupAccount';
import AlertSection from '../../AlertSection';
import { ReactComponent as EmailIcon } from '../../../../assets/icons/email-sent.svg';
import { ReactComponent as CheckSuccessIcon } from '../../../../assets/icons/check-success.svg';
import { ReactComponent as InfoIcon } from '../../../../assets/icons/info-icon.svg';
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
          title="Email Sent"
          description="Please check your email box to continue the registration."
          buttonLabel="Resend Link"
          onButtonClick={onResendActivation}
          isLoading={isLoading}
          icon={<EmailIcon />}
        />
      )}
      {alertSection === SignupAlertSection.SUCCESS_INVITED_SIGNUP && (
        <AlertSection
          title="Success"
          description="User data is saved. Now you can login with your email and password."
          buttonLabel="Go to Login"
          onButtonClick={() => navigate('/auth/login')}
          icon={<CheckSuccessIcon />}
        />
      )}
      {alertSection === SignupAlertSection.ERROR_INVITED_DATA && (
        <AlertSection
          title="Error"
          description="Token is invalid or expired. Please contact your school administrator."
          buttonLabel="Go to Login"
          onButtonClick={() => navigate('/auth/login')}
          icon={<InfoIcon width={100} height={100} />}
        />
      )}
    </>
  );
}

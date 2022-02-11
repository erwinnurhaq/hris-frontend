import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';

import { ReactComponent as CheckSuccessIcon } from '../../../assets/icons/check-success.svg';
import { userActivate } from '../../../services/auth.service';
import AlertSection from '../AlertSection';

function Activate() {
  const navigate = useNavigate();
  const [isUserActivated, setIsUserActivated] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);

  async function initActivate() {
    try {
      const token = new URLSearchParams(window.location.search).get('token');

      if (!token) {
        return message.error('Token is required.');
      }
      await userActivate(token);
      if (!isMounted.current) return;

      message.success('Successfully activated.');
      setIsUserActivated(true);
    } catch (err: unknown) {
      if (!isMounted.current) return;

      message.error(err === 'User is already verified' ? err : 'Token is invalid or expired.');
      navigate('/');
    }
  }

  useEffect(() => {
    isMounted.current = true;
    initActivate();
    return () => {
      isMounted.current = false;
    };
  }, []);

  if (isUserActivated) {
    return (
      <AlertSection
        title="User Activated"
        description="Now you can login with your email and password."
        buttonLabel="Go to Login"
        onButtonClick={() => navigate('/')}
        icon={<CheckSuccessIcon />}
      />
    );
  }

  return (
    <div className="loading-container-block">
      <Spin tip="Loading..." />
    </div>
  );
}

export default Activate;

import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { message } from 'antd';

import { userActivate } from 'services/auth.service';

function useActivate() {
  const navigate = useNavigate();
  const [isUserActivated, setIsUserActivated] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);

  async function initActivate() {
    try {
      const token = new URLSearchParams(window.location.search).get('token');

      if (!token) {
        return message.error('Token diperlukan.');
      }
      await userActivate(token);
      if (!isMounted.current) return;

      message.success('Sukses Aktivasi.');
      setIsUserActivated(true);
    } catch (err: unknown) {
      if (!isMounted.current) return;

      message.error(
        err === 'User is already verified'
          ? 'User telah terverifikasi.'
          : 'Token tidak valid atau kedaluwarsa.'
      );
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

  return { navigate, isUserActivated };
}

export default useActivate;

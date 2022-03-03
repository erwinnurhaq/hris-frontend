import { FormEvent, useEffect, useRef, useState } from 'react';
import { message } from 'antd';

import { userActivateResend, userSignup } from 'services/auth.service';
import { getInvitedUserData, invitedSignup } from 'services/user.service';
import { TFormElements } from 'interfaces/common.interface';
import { IInvitedUserData } from 'interfaces/user.interface';

import {
  IErrorPassInfo,
  IUserRef,
  TSignupAlertSection,
  TSignupFormElements,
} from './signup.interface';

export enum SignupAlertSection {
  SUCCESS_SIGNUP = 'success_signup',
  SUCCESS_INVITED_SIGNUP = 'success_invited_signup',
  ERROR_INVITED_DATA = 'error_invited_data',
}

function useSignup() {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvited, setIsInvited] = useState<boolean>(false);
  const [alertSection, setAlertSection] = useState<TSignupAlertSection>(undefined);
  const [error, setError] = useState<IErrorPassInfo>({
    password: '',
    confirmPassword: '',
  });

  const isMounted = useRef<boolean>(false);
  const tokenRef = useRef<string | null>(null);
  const userRef = useRef<IUserRef | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);

  function checkPasswordValid(password: string, confirmPassword: string) {
    const currentError: IErrorPassInfo = {
      password: '',
      confirmPassword: '',
    };
    if (password.length < 6) {
      currentError.password = 'Panjang password min. 6 karakter';
    }
    if (confirmPassword !== password) {
      currentError.confirmPassword = 'Konfirm password tidak cocok';
    }
    return currentError;
  }

  async function onRegister(ev: FormEvent<HTMLFormElement>) {
    if (ev.preventDefault) ev.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const form = ev.currentTarget.elements as TFormElements<TSignupFormElements>;
      const errorPassword: IErrorPassInfo = checkPasswordValid(
        form.password.value,
        form.confirmPassword.value
      );

      if (errorPassword.password || errorPassword.confirmPassword) {
        setError(errorPassword);
        setIsLoading(false);
        return;
      }

      if (isInvited && tokenRef.current) {
        await invitedSignup({
          password: form.password.value,
          token: tokenRef.current,
        });
      } else {
        await userSignup({
          name: form.name.value,
          email: form.email.value,
          password: form.password.value,
          school: form.school.value,
        });
      }

      if (!isMounted.current) return;

      userRef.current = { email: form.email.value };
      message.success('Email berhasil dikirim.');
      setAlertSection(
        isInvited ? SignupAlertSection.SUCCESS_INVITED_SIGNUP : SignupAlertSection.SUCCESS_SIGNUP
      );
      setIsLoading(false);
    } catch (err: unknown) {
      if (!isMounted.current) return;

      message.error(err as string);
      setIsLoading(false);
    }
  }

  async function onResendActivation() {
    if (!userRef.current?.email) return;
    try {
      setIsLoading(true);
      await userActivateResend(userRef.current.email);
      if (!isMounted.current) return;

      message.success('Email berhasil dikirim.');
      setIsLoading(false);
    } catch (err: unknown) {
      if (!isMounted.current) return;

      message.error(err as string);
      setIsLoading(false);
    }
  }

  async function initialCheck() {
    if (!tokenRef.current) {
      setIsInitialLoading(false);
      return;
    }
    try {
      const data: IInvitedUserData = await getInvitedUserData(tokenRef.current);
      if (!isMounted.current) return;

      userRef.current = data;
      setIsInitialLoading(false);
      setIsInvited(true);
    } catch (err: unknown) {
      if (!isMounted.current) return;

      message.error('Token tidak valid.');
      setIsInitialLoading(false);
      setIsInvited(true);
      setAlertSection(SignupAlertSection.ERROR_INVITED_DATA);
    }
  }

  useEffect(() => {
    isMounted.current = true;
    tokenRef.current = new URLSearchParams(window.location.search).get('token');
    initialCheck();
    return () => {
      isMounted.current = false;
    };
  }, []); // eslint-disable-line

  return {
    formRef,
    userRef,
    isInitialLoading,
    isLoading,
    isInvited,
    alertSection,
    error,
    onRegister,
    onResendActivation,
  };
}

export default useSignup;

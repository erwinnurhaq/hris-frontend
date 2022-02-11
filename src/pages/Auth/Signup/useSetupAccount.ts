import { useState, useRef, useEffect, FormEvent, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import { userActivateResend, userSignup } from '../../../services/auth.service';
import { getInvitedUserData, invitedSignup } from '../../../services/user.service';
import { TFormElements } from '../../../interfaces/common.interface';
import { IInvitedUserData } from '../../../interfaces/user.interface';

export enum SignupAlertSection {
  SUCCESS_SIGNUP = 'success_signup',
  SUCCESS_INVITED_SIGNUP = 'success_invited_signup',
  ERROR_INVITED_DATA = 'error_invited_data',
}

export type TSignupAlertSection =
  | 'success_signup'
  | 'success_invited_signup'
  | 'error_invited_data'
  | undefined;

export type TSignupFormElements = 'name' | 'email' | 'school' | 'password' | 'confirmPassword';

export interface IErrorPassInfo {
  password: string;
  confirmPassword: string;
}

export interface IUserRef {
  email?: string;
  name?: string;
  school?: string;
}

export interface IUseSignup {
  userRef: RefObject<IUserRef | undefined>;
  formRef: RefObject<HTMLFormElement>;
  isInitialLoading: boolean;
  isLoading: boolean;
  isInvited: boolean;
  alertSection: TSignupAlertSection;
  error: IErrorPassInfo;
  onRegister: (ev: FormEvent<HTMLFormElement>) => Promise<void>;
  onResendActivation: () => Promise<void>;
  onGoToLogin: () => void;
}

function useSignup() {
  const navigate = useNavigate();

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
      currentError.password = 'Password length min. 6 character';
    }
    if (confirmPassword !== password) {
      currentError.confirmPassword = 'Confirm password is not match';
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
      message.success('Email successfully sent.');
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

      message.success('Email successfully sent.');
      setIsLoading(false);
    } catch (err: unknown) {
      if (!isMounted.current) return;

      message.error(err as string);
      setIsLoading(false);
    }
  }

  function onGoToLogin() {
    navigate('/auth/login');
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

      message.error('Token is invalid');
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
    onGoToLogin,
  };
}

export default useSignup;

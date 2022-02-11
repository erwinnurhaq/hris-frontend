import { FormEvent } from 'react';

export interface IUseForgotPassword {
  isLoading: boolean;
  isSuccess: boolean;
  onSendRequest: (ev: FormEvent<HTMLFormElement>) => Promise<void> | void;
  onGoToLogin: () => void;
}

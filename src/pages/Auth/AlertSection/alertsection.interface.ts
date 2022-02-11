import { ReactNode } from 'react';

export interface IAlertSection {
  className?: string;
  icon?: ReactNode;
  title: string;
  description: string;
  isShowButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: (ev?: any) => Promise<void> | void;
  isLoading?: boolean;
}

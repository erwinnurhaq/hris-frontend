import { TEducationalStage } from 'interfaces/user.interface';

export interface IPatchMeDto {
  name?: string;
  address?: string;
  birthdate?: string;
  lastEducation?: {
    educationalStage: TEducationalStage;
    major: string;
    campus: string;
    graduateYear: number;
  };
  bankAccount?: {
    name: string;
    number: string;
  };
}

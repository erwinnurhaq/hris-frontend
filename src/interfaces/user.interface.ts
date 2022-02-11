export type TRole = 'MASTER' | 'ADMIN' | 'USER';
export type TEducationalStage = 'D3' | 'S1' | 'S2';
export type TSchoolLevel = 'SD' | 'SMP' | 'SMA' | 'SMK';
export type TSchoolStatus = 'NEGERI' | 'SWASTA';

export interface IClassroom {
  id: number;
  name: string;
  subjects?: ISubject[];
}

export interface ISubject {
  id: number;
  name: string;
  users?: IUser[];
  classrooms?: IClassroom[];
}

export interface IBankAccount {
  id: number;
  name: string;
  number: string;
  users?: IUser[];
}

export interface ILastEducation {
  id: number;
  educationalStage: TEducationalStage;
  major: string;
  campus: string;
  graduateYear: number;
  users?: IUser[];
}

export interface ISchool {
  id: number;
  name: string;
  address: string;
  level?: TSchoolLevel;
  type?: TSchoolStatus;
  users?: IUser[];
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: TRole;
  address: string;
  createdAt: string;
  verified: string;
}

export interface IUserDetail extends IUser {
  birthdate?: string;
  school?: ISchool;
  lastEducation?: ILastEducation;
  bankAccount?: IBankAccount;
  subjects?: ISubject;
}

export interface IInvitedUserData {
  name: string;
  email: string;
  school: string;
}

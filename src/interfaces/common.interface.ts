export interface IFormDataValues {
  [key: string]: any;
}

export interface IFetchSuccess {
  message?: string;
}

export interface IPaginationDto {
  page: string;
  size: string;
  orderBy?: string;
  direction?: string;
  name?: string;
}

export type TFormElements<U extends string> = HTMLFormControlsCollection &
  Record<U, HTMLInputElement>;

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

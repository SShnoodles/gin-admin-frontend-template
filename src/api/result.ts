export type Result<T> = {
  resultCode: string;
  errorMessage: string;
  data: T;
};

export type Page<T> = {
  data: T;
  total: number;
};

export type Result<T> = {
  resultCode: string;
  errorMessage: string;
  data: T;
};

export type Page<T> = {
  records: T;
  count: number;
  pages: number;
};

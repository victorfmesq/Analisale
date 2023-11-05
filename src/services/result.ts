export interface Result<T> {
  isSuccess?: boolean;
  message?: string;
  value: T;
}

export const FAILED_REQUEST_RES: Result<any> = {
  isSuccess: false,
  message: undefined,
  value: null,
};

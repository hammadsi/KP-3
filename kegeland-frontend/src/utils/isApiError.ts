import { AxiosError } from 'axios';

interface ApiErrorDTO {
  statusCode: number;
  message: string[] | string;
  error: string;
}

export const isApiError = (
  error: AxiosError<any>,
): error is AxiosError<ApiErrorDTO> => {
  return error.response?.data && error.response.data.message;
};

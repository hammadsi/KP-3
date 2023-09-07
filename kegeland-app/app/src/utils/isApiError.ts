import {AxiosError} from 'axios';

interface ApiErrorDTO {
  statusCode: number;
  message: string[] | string;
  error: string;
}

/**
 * Check if an error is of type ApiError. Will typecast the error to {@link ApiErrorDTO} if true
 * @param error the error
 * @returns true if error is an api error
 */
export const isApiError = (
  error: AxiosError<any>,
): error is AxiosError<ApiErrorDTO> => {
  return error.response?.data && error.response.data.message;
};

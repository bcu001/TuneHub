import axios from "axios";

interface ApiErrorResponse {
  message?: string;
}

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong",
): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
};

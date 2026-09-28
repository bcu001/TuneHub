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

/**
 * Utility to combine class names conditionally.
 * Accepts any number of arguments that are strings, falsy values, or undefined.
 * Returns a single string with truthy class names joined by spaces.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

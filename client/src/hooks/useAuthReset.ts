import { apiError } from "@/lib/apiError";
import {
  requestResetPassword,
  resetPassword,
} from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAuthReset() {
  return useMutation({
    mutationFn: (email: string) => requestResetPassword(email),
    onSuccess: () => {
      toast.success("Password reset link sent to your email");
    },
    onError: (error: unknown) => {
      apiError(error);
      console.error("Error at reset password", error);
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }) => resetPassword(token, newPassword),
    onSuccess: () => {
      toast.success("Password reset successfully");
    },
    onError: (error: unknown) => {
      apiError(error);
      console.error("Error at reset password", error);
    },
  });
}

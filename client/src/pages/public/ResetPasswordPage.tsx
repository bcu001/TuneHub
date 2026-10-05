import { Link, useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useResetPassword } from "@/hooks/useAuthReset";
import useDocumentTitle from "@/hooks/useDocumentTitle";

type ResetPasswordForm = {
  newPassword: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  useDocumentTitle("Reset Password | TuneHub")
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const form = useForm<ResetPasswordForm>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const resetMutation = useResetPassword();

  const onSubmit = (data: ResetPasswordForm) => {
    if (!token) return;

    resetMutation.mutate(
      {
        token,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      },
    );
  };

  if (!token) {
    return (
      <div className="flex mt-20 items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Invalid Reset Link</CardTitle>

            <CardDescription>
              This password reset link is missing or invalid.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button asChild className="w-full">
              <Link to="/forgot-password">Request a New Link</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex mt-20 items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>

          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>

              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                autoComplete="new-password"
                {...form.register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />

              {form.formState.errors.newPassword && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                autoComplete="new-password"
                {...form.register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === form.getValues("newPassword") ||
                    "Passwords do not match",
                })}
              />

              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={resetMutation.isPending}
            >
              {resetMutation.isPending ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

          <div className="mt-5 text-center text-sm">
            <Link
              to="/login"
              className="text-muted-foreground hover:text-foreground"
            >
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router";
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

import { useAuthReset } from "@/hooks/useAuthReset";
import useDocumentTitle from "@/hooks/useDocumentTitle";

type ForgotPasswordForm = {
  email: string;
};

export default function ForgetPasswordPage() {
  useDocumentTitle("Forget Password | TuneHub")
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: "",
    },
  });

  const resetMutation = useAuthReset();

  const onSubmit = (data: ForgotPasswordForm) => {
    resetMutation.mutate(data.email, {
      onSuccess: () => {
        setSubmitted(true);
      },
    });
  };

  if (submitted) {
    return (
      <div className="flex mt-20 items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Check your email</CardTitle>

            <CardDescription>
              If an account exists with that email, we've sent you a password
              reset link.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSubmitted(false)}
            >
              Try another email
            </Button>

            <div className="text-center text-sm">
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

  return (
    <div className="flex mt-20 items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot Password?</CardTitle>

          <CardDescription>
            Enter your email address and we'll send you a password reset link.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...form.register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />

              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={resetMutation.isPending}
            >
              {resetMutation.isPending ? "Sending..." : "Send Reset Link"}
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

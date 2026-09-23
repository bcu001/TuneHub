import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { apiError } from "@/lib/apiError";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, Navigate } from "react-router";

interface Inputs {
  email: string;
  password: string;
}

const RegisterPage = () => {
  const { handleSubmit, register } = useForm<Inputs>();
  const { signinHandler, signinPending, isAuthenticated } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await signinHandler(data.email, data.password);
    } catch (error: unknown) {
      apiError(error);
      console.error("Error at login", error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              className="input input-lg"
              placeholder="mail@site.com"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "email is required",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="pass">Password</FieldLabel>
            <Input
              id="pass"
              className="input input-lg"
              placeholder="*********"
              {...register("password", {
                required: {
                  value: true,
                  message: "password is required",
                },
              })}
              type="password"
            />
          </Field>
          <Button type="submit">
            {signinPending ? "Signing in" : "Submit"}
          </Button>
        </form>
      </div>
      <div className="flex gap-1">
        <div>First time here?</div>
        <Button variant={"link"}>
          <Link to={`/register`} className="link link-info">
            Register
          </Link>
        </Button>
        instead
      </div>
    </div>
  );
};

export default RegisterPage;

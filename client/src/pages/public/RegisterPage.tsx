import useAuth from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { apiError } from "@/lib/apiError";

interface Inputs {
  name: string;
  email: string;
  password: string;
}

const LoginPage = () => {
  const { handleSubmit, register } = useForm<Inputs>();
  const { signupHandler, signupPending } = useAuth();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await signupHandler(data.name, data.email, data.password);
      navigate("/login");
    } catch (error:unknown) {
      apiError(error);
      console.error("Error at login", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              placeholder="Full Name"
              type="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "name is required",
                },
              })}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
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
            {signupPending ? "Creating..." : "Submit"}
          </Button>
        </form>
      </div>
      <div className="flex gap-1">
        <div>Already have an account?</div>
        <div>
          <Button variant={"link"}>
            <Link to={`/login`} className="link link-info">
              Login
            </Link>{" "}
          </Button>
          instead
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

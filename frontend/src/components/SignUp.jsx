import { useForm } from "react-hook-form";

const SignUp = ({toggleAuthMode}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data,e) => {
    console.log("e is printing", e);
    console.log("Creating new account", data);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-auto h-auto rounded-md border border-black p-4 transition-all duration-300 ease-in-out">
        <h1 className="text-3xl text-center">Create an account</h1>
        <div className="text-center mb-3">
          Already have an account?{" "}
          <span
            onClick={toggleAuthMode}
            className="underline text-blue-500 cursor-pointer"
          >
            Log in
          </span>
        </div>
        <form
          className="flex flex-col gap-3"
          action=""
          onSubmit={handleSubmit(onsubmit)}
        >
          <input
            className="border-b-[3px] border-black outline-none"
            {...register("username", {
              required: {
                value: true,
                message: "Please enter fill this Field",
              },
              minLength: {
                value: 5,
                message: "Min length of username is 5",
              },
            })}
            type="text"
            placeholder="Username"
          />
          {errors.username && (
            <div className="text-red-500">{errors.username.message}</div>
          )}

          <input
            className="border-b-[3px] border-black outline-none"
            placeholder="Email"
            {...register("email", {
              required: {
                value: true,
                message: "Please enter fill this Field",
              },
            })}
            type="email"
          />

          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}

          <input
            className="border-b-[3px] border-black outline-none"
            {...register("password", {
              required: {
                value: true,
                message: "Please enter fill this Field",
              },
              minLength: {
                value: 8,
                message: "Minimum length should be 8",
              },
            })}
            type="password"
            placeholder="Password"
          />

          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
          <input
            className="bg-black p-1 cursor-pointer text-white font-bold rounded-md"
            type="submit"
            value="Sign up"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;

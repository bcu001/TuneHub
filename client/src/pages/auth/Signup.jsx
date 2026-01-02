import React, { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/context/authContext";

const Signup = () => {
  useDocumentTitle("TuneHub | Register");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      setIsLoading(true);
      await signup(data);
      setErr(null);
      navigate("/login")
    } catch (error) {
      // console.log(error.response?.data?.message || error.message);
      setErr(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center text-text-main-dark">
      <h1 className="text-4xl mb-8 text-center heading-text">
        Discover a World of Music
        <span className="block text-lg text-text-sec-dark">Sign Up for TuneHub!</span>
      </h1>

      <div className="w-[350px] sm:w-[400px] p-6 rounded-lg bg-surface-dark">
        <h2 className="text-2xl font-semibold mb-4 text-center ">
          Create Your Account
        </h2>
        <p className="text-center mb-6 text-text-sec-dark">
          Already part of TuneHub?{" "}
          <Link
            to={"/login"}
            className="underline transition-colors duration-300"
          >
            Log in
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="w-full p-3 rounded-lg outline-none "
            {...register("name", {
              required: "Name is requried!",
              minLength: 2,
            })}
            placeholder="Name"
          />
          {errors.name && (
            <span className=" text-red-500 font-semibold">
              {errors.name.message}
            </span>
          )}

          <input
            placeholder="Email"
            className="w-full p-3 rounded-lg outline-none "
            {...register("email", { required: "Email Address is requried!" })}
          />
          {errors.email && (
            <span className=" text-red-500 font-semibold">
              {errors.email.message}
            </span>
          )}

          <div className="relative">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="w-full p-3 rounded-lg outline-none "
              {...register("password", {
                required: "password is required!",
                minLength: {
                  value: 8,
                  message: "Mininum length of password is 8",
                },
              })}
            />
            <div
              className={`absolute top-3 right-3 w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${
                showPassword ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={handlerShowPassword}
              title={showPassword ? "Hide Password" : "Show Password"}
            ></div>
            {errors.password && (
              <span className=" text-red-500 font-semibold">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            className="w-full p-3 mt-4 rounded-lg font-bold bg-black cursor-pointer"
            type="submit"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>

      {err && <div className="text-red-500 font-semibold">{err && err}</div>}
    </div>
  );
};

export default Signup;

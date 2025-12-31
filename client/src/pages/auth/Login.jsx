import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/authContext";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useForm } from "react-hook-form";

const Login = () => {
  useDocumentTitle("TuneHub | Login");

  const navigate = useNavigate();

  const { signin } = useContext(AuthContext);

  const [err, setErr] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      const res = await signin(data);
      console.log(res);
      setErr(null);
      navigate("/")
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      setErr(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-white">
      <div className=" mb-8 text-center">
        <h1 className="text-4xl font-bold">Welcome Back to TuneHub</h1>
        <span className="block text-lg">Your Gateway to Endless Music</span>
      </div>

      <div className="w-[350px] sm:w-[400px] p-6 rounded-lg shadow-lg backdrop-blur-2xl text-white">
        <h2 className="text-2xl font-semibold mb-4 text-center ">
          Log Into Your Account
        </h2>
        <p className="text-center mb-6">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="underline text-[var(--primary-color)] transition-colors duration-300"
          >
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

          <div className="text-red-500 font-semibold">{err && err}</div>

          <button
            className="w-full p-3 mt-4 rounded-lg font-bold bg-black cursor-pointer"
            type="submit"
          >
            {isLoading ? "Signing up..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

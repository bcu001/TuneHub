import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    document.title = "TuneHub | Login";
  }, []);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = () => {};
  const handleClick = () => {};
  return (
    <div className="w-screen h-screen flex-col flex items-center justify-evenly">
      <div className="text-4xl text-center font-bold">
        Welcome Back to TuneHub – Your Gateway to Endless Music!
      </div>
      <div className="w-auto h-auto rounded-md border border-black p-4 transition-all duration-300 ease-in-out">
        <h1 className="text-2xl text-center">Log Into Your Account</h1>
        <div className="text-center mb-3">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="underline text-blue-500 cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
        <form className="flex flex-col gap-3">
          <input
            className="border-b-[3px] border-black outline-none"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            required={true}
          />
          <div className="relative">
            <input
              className="border-b-[3px] border-black outline-none"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              required={true}
            />
            <div
              className={`w-[20px] h-[20px] cursor-pointer absolute top-0 right-0 transition-all duration-300 ease-in-out ${
                showPassword ? "bg-green-400" : "bg-red-500"
              }`}
              onClick={handlerShowPassword}
            ></div>
          </div>

          <div className="flex gap-3">
            <input type="checkbox" name="rememberMe" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          {/* {err && err} */}

          <button
            className="bg-black p-1 text-white font-bold rounded-md"
            type="submit"
            onClick={handleClick}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

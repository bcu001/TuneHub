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
    <div className="w-screen h-screen flex flex-col items-center justify-center jet-black">
      {/* Header */}
      <h1 className="text-4xl mb-8 text-center luxury-heading">
        Welcome Back to TuneHub
        <span className="block luxury-text text-lg">
          Your Gateway to Endless Music
        </span>
      </h1>

      {/* Login Form Container */}
      <div className="w-[350px] sm:w-[400px] p-6 rounded-lg shadow-lg onyx-black border">
        <h2 className="text-2xl font-semibold mb-4 text-center luxury-text">
          Log Into Your Account
        </h2>
        <p className="text-center mb-6">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="underline luxury-icon hover:luxury-icon-hover transition-colors duration-300"
          >
            Sign Up
          </Link>
        </p>

        {/* Login Form */}
        <form className="flex flex-col gap-4">
          {/* Username */}
          <input
            className="w-full p-3 rounded-lg outline-none charcoal-black focus:ring-2 focus:ring-[var(--secondary-text-color)]"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              className="w-full p-3 rounded-lg outline-none charcoal-black focus:ring-2 focus:ring-[var(--secondary-text-color)]"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <div
              className={`absolute top-3 right-3 w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${
                showPassword ? "bg-[var(--input-hover)]" : "bg-red-500"
              }`}
              onClick={handlerShowPassword}
              title={showPassword ? "Hide Password" : "Show Password"}
            ></div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              className="cursor-pointer"
            />
            <label htmlFor="rememberMe" className="luxury-text">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            className="w-full p-3 mt-4 rounded-lg font-bold charcoal-black hover:charcoal-black-hover transition-colors duration-300"
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

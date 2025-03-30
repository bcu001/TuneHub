import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/authContext";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Login = () => {
  useDocumentTitle("TuneHub | Login");

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-white">
      {/* Header */}
      <div className=" mb-8 text-center">
        <h1 className="text-4xl font-bold">Welcome Back to TuneHub</h1>
        <span className="block text-lg">Your Gateway to Endless Music</span>
      </div>

      {/* Login Form Container */}
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <input
            className="w-full p-3 rounded-lg outline-none"
            type="text"
            name="username"
            value={inputs.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              className="w-full p-3 rounded-lg outline-none "
              type={showPassword ? "text" : "password"}
              name="password"
              value={inputs.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <div
              className={`absolute top-3 right-3 w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${
                showPassword ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={handlerShowPassword}
              title={showPassword ? "Hide Password" : "Show Password"}
            ></div>
          </div>

          {/* Remember Me */}
          {/* <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              className="cursor-pointer"
            />
            <label htmlFor="rememberMe" className="luxury-text">
              Remember me
            </label>
          </div> */}

          {/* {Error} */}
          <div className="text-red-500 font-semibold">{err && err}</div>

          {/* Login Button */}
          <button
            className="w-full p-3 mt-4 rounded-lg font-bold bg-black cursor-pointer"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

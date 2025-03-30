import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Register = () => {
  useDocumentTitle("TuneHub | Register");

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center text-white">
      {/* Header */}
      <h1 className="text-4xl mb-8 text-center heading-text">
        Discover a World of Music
        <span className="block text-lg">Sign Up for TuneHub!</span>
      </h1>

      {/* Register Form Container */}
      <div className="w-[350px] sm:w-[400px] p-6 rounded-lg shadow-lg backdrop-blur-2xl border">
        <h2 className="text-2xl font-semibold mb-4 text-center ">
          Create Your Account
        </h2>
        <p className="text-center mb-6">
          Already part of TuneHub?{" "}
          <Link
            to={"/login"}
            className="underline transition-colors duration-300"
          >
            Log in
          </Link>
        </p>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <input
            className="w-full p-3 rounded-lg outline-none "
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            className="w-full p-3 rounded-lg outline-none "
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              className="w-full p-3 rounded-lg outline-none "
              type={showPassword ? "text" : "password"}
              name="password"
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

          {/* Register Button */}
          <button
            className="w-full p-3 mt-4 rounded-lg font-bold bg-black cursor-pointer"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
      {/* Error if any  */}
      {err && <div className="text-red-500 font-semibold">{err && err}</div>}
    </div>
  );
};

export default Register;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  useEffect(() => {
    document.title = "TuneHub | Register";
  }, []);

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

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      inputs.email.length === 0 ||
      inputs.username.length === 0 ||
      inputs.password.length === 0
    ) {
      const newErr = new Error("Please fill out the form completely.");
      setErr(newErr);
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/auth/register", inputs);
    } catch (err) {
      setErr(err);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center jet-black">
      {/* Header */}
      <h1 className="text-4xl mb-8 text-center luxury-heading">
        Discover a World of Music
        <span className="block luxury-text text-lg">Sign Up for TuneHub!</span>
      </h1>

      {/* Register Form Container */}
      <div className="w-[350px] sm:w-[400px] p-6 rounded-lg shadow-lg onyx-black border">
        <h2 className="text-2xl font-semibold mb-4 text-center luxury-text">
          Create Your Account
        </h2>
        <p className="text-center mb-6">
          Already part of TuneHub?{" "}
          <Link
            to={"/login"}
            className="underline luxury-icon hover:luxury-icon-hover transition-colors duration-300"
          >
            Log in
          </Link>
        </p>

        {/* Register Form */}
        <form className="flex flex-col gap-4">
          {/* Username */}
          <input
            className="w-full p-3 rounded-lg outline-none charcoal-black focus:ring-2 focus:ring-[var(--secondary-text-color)]"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required={true}
          />

          {/* Email */}
          <input
            className="w-full p-3 rounded-lg outline-none charcoal-black focus:ring-2 focus:ring-[var(--secondary-text-color)]"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required={true}
          />

          {/* Password */}
          <div className="relative">
            <input
              className="w-full p-3 rounded-lg outline-none charcoal-black focus:ring-2 focus:ring-[var(--secondary-text-color)]"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required={true}
            />
            <div
              className={`absolute top-3 right-3 w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${
                showPassword ? "bg-[var(--input-hover)]" : "bg-red-500"
              }`}
              onClick={handlerShowPassword}
              title={showPassword ? "Hide Password" : "Show Password"}
            ></div>
          </div>

          {/* Error Message */}
          {err && <p className="text-red-500 text-sm">{err.message}</p>}

          {/* Register Button */}
          <button
            className="w-full p-3 mt-4 rounded-lg font-bold charcoal-black hover:charcoal-black-hover transition-colors duration-300"
            type="submit"
            onClick={handleClick}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

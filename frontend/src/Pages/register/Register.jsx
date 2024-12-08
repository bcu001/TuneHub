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
    console.log(e);
    console.log(inputs);
    if (
      inputs.email.length === 0 ||
      inputs.username.length === 0 ||
      inputs.password.length === 0
    ) {
      const newErr = new Error("fill form properly");
      setErr(newErr);
      console.log(newErr.message);
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/auth/register", inputs);
    } catch (err) {
      console.log(err.response.data);
      setErr(err);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-evenly">
      <div className="text-4xl text-center font-bold">
        Discover a World of Music – Sign Up for TuneHub!
      </div>
      <div className="w-auto h-auto rounded-md border border-black p-4 transition-all duration-300 ease-in-out">
        <h1 className="text-2xl text-center">Create Your Account</h1>
        <div className="text-center mb-3">
          Already part of TuneHub?{" "}
          <Link
            to={"/login"}
            className="underline text-blue-500 cursor-pointer"
          >
            Log in
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
          <input
            className="border-b-[3px] border-black outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
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

          {/* {err && err} */}
          <button
            className="bg-black p-1 text-white font-bold rounded-md"
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

import React from "react";
import { useForm } from "react-hook-form";

const LogIn = ({toggleAuthMode}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/login");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const checkData = await response.json();
      console.log(checkData);
      console.log(data);
      const index = checkData.findIndex((item) => item.email === data.email);

      if (index !== -1) {
        console.log(`Email found at index ${index}`);
        if (checkData[index].password === data.password) {
          console.log("Logged In");
        } else {
          console.log("Database password:", checkData[index].password);
          console.log("Given password", data.password);
          console.log("Wrong password");
        }
      } else {
        console.log("Email not found in the data");
      }
    } catch (err) {
      console.error("Error fetching users:", err.message);
      setError(err.message); // Handle errors
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-auto h-auto rounded-md border border-black p-4 transition-all duration-300 ease-in-out">
        <h1 className="text-3xl text-center">Log in</h1>
        <div className="text-center mb-3">
          Don't have an account?{" "}
          <span
            onClick={toggleAuthMode}
            className="underline text-blue-500 cursor-pointer"
          >
            Sign up
          </span>
        </div>
        <form
          className="flex flex-col gap-3"
          action=""
          onSubmit={handleSubmit(onsubmit)}
        >
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

          <select
            className="border-b-[3px] border-black outline-none bg-white bo"
            name="role"
            id="role"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          
          <input
            className="bg-black p-1 cursor-pointer text-white font-bold rounded-md"
            type="submit"
            value={"Log in"}
          />
        </form>
      </div>
    </div>
  );
};

export default LogIn;

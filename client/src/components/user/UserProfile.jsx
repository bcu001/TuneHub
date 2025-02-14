import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { assets } from "@/assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/authContext";
import { Settings, LogOut } from "lucide-react";

const UserProfile = () => {
  useEffect(() => {
    document.title = "TuneHub | Profile";
  }, []);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  // const handleLogout = async () => {
  //     // logout
  //     localStorage.removeItem("user");
  //     navigate("/login");
  // };

  return (
    <div className="shadow-ui aspect-square mx-auto px-4 py-4 rounded-md ">
      <h1 className="text-xl text-white font-bold">User Profile</h1>
      <div>
        <div className="mb-5">
          <h2 className=" text-xl">Profile Information</h2>
          <p className="text-sm text-gray-400">
            Update your account details here.
          </p>
        </div>
        <div className="mb-4">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={assets.defaultProfile}
            alt="profile"
          />
        </div>
        <div className="mb-4">
          <h3 className="font-bold ">Username</h3>
          <input
            type="text"
            name=""
            id=""
            value={currentUser.username}
            className="bg-transparent border rounded-md py-1 px-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h3 className="font-bold ">Email</h3>
          <input
            type="text"
            name=""
            id=""
            value={currentUser.email}
            className="bg-transparent border rounded-md py-1 px-2 w-full"
          />
        </div>
      </div>
      <button className="bg-white px-3 py-2 rounded-md cursor-pointer w-full">
        Update Profile
      </button>
    </div>
  );
};

export default UserProfile;

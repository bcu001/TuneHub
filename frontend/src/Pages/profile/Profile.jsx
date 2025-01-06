import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { assets } from "@/assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "@/context/darkModeContext";
import { AuthContext } from "@/context/authContext";
import { Settings, LogOut } from "lucide-react";

const Profile = () => {
  useEffect(() => {
    document.title = "TuneHub | Profile";
  }, []);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    // logout
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div className="overflow-hidden md:w-full w-95 m-auto border rounded-md p-5 h-full shadow-lg ">
        {/* Profile Details */}
        <div className="flex flex-col items-center gap-4">
          <img
            className="w-24 h-24 object-cover rounded-full border-4 border-gold-500 shadow-sm"
            src={assets.defaultProfile}
            alt="Profile"
          />
          <div className="text-center">
            <h2 className="text-xl font-bold luxury-heading">
              {currentUser.username}
            </h2>
            <span className="text-sm">{currentUser.email}</span>
          </div>
        </div>

        {/* Acount Setting */}
        <div className="flex flex-col mt-5">
          <h3 className="font-bold text-base m-2">Account Settings</h3>
          <button className="m-2 py-2 rounded-md bg-black flex gap-2 justify-center items-center hover:opacity-80">
            <Settings />
            <span>Edit Profile</span>
          </button>
          <button
            className="m-2 py-2 rounded-md bg-red-600 flex gap-2 justify-center items-center hover:opacity-80"
            onClick={handleLogout}
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;

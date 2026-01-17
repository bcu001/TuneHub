import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { assets } from "@/assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { LuSunMoon } from "react-icons/lu";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/authContext";
import axios from "axios";

const Profile = () => {
  useEffect(() => {
    document.title = "TuneHub | Profile";
  }, []);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const { darkMode, toggle } = useContext(ThemeContext);

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [darkMode]);

  const handleLogout = async () => {
    // logout
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <>
      <div className="border p-5 max-w-md mx-auto rounded-lg shadow-lg">
        {/* Profile Header */}
        <div className="text-center mb-5">
          <h1 className="luxury-heading text-3xl">Profile</h1>
          <p className="luxury-text mt-2">
            Manage your account and preferences
          </p>
        </div>

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
            <span className="text-black px-2 rounded-lg bg-[rgb(218,165,32)]">
              {currentUser.role}
            </span>
          </div>
        </div>

        {/* Actions Section */}
        <div className="mt-6 space-y-4">
          <div
            onClick={toggle}
            className="button block w-full text-center py-2 rounded-lg charcoal-black button imt"
          >
            <div className="flex items-center justify-center transition-all duration-300 ease-in-out">
              {darkMode ? <LuSunMoon size={25} /> : <CiLight size={25} />}
            </div>
          </div>
          <Link
            to="/admin-panel"
            className="button block w-full text-center py-2 rounded-lg charcoal-black button"
          >
            Admin Panel
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-500"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Profile = () => {
  useEffect(() => {
    document.title = "TuneHub | Profile";
  }, []);

  return (
    <div className="p-5 max-w-md mx-auto bg-secondary-bg-color rounded-lg shadow-lg onyx-black">
      {/* Profile Header */}
      <div className="text-center mb-5">
        <h1 className="luxury-heading text-3xl">Profile</h1>
        <p className="luxury-text mt-2">Manage your account and preferences</p>
      </div>

      {/* Profile Details */}
      <div className="flex flex-col items-center gap-4">
        <img
          className="w-24 h-24 object-cover rounded-full border-4 border-gold-500 shadow-sm"
          src={assets.defaultProfile}
          alt="Profile"
        />
        <div className="text-center">
          <h2 className="text-xl font-bold luxury-heading">Username</h2>
          <span className="text-black px-2 rounded-lg bg-[#daa520]">Admin</span>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="theme" className="luxury-text">
            Theme
          </label>
          <select
            id="theme"
            name="theme"
            className="charcoal-black w-1/2 py-1 px-2 rounded-lg"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <Link
          to="/admin-panel"
          className="block w-full text-center py-2 rounded-lg charcoal-black"
        >
          Admin Panel
        </Link>
        <button className="block w-full text-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-500">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;

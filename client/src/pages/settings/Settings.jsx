import { AuthContext } from "@/context/authContext";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Volume2, VolumeOff, UserCircle } from "lucide-react";
import { MusicPlayerContext } from "@/context/MusicPlayerContext";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Settings = () => {
  const { currentUser } = useContext(AuthContext);
  const { vol, handleVol } = useContext(MusicPlayerContext);
  useDocumentTitle("TuneHub | Setting")

  return (
    <div className="p-6 h-full text-white ">
      <h1 className="font-bold text-3xl mb-2">Settings</h1>
      <p className="text-sm mb-6">
        Manage your app preferences and account settings
      </p>

      {/* Admin Panel Access */}
      {currentUser?.role === "admin" && (
        <div className="mb-6 p-4 backdrop-blur-2xl rounded-lg flex justify-between items-center">
          <span className="text-lg font-medium">Admin Panel</span>
          <Link
            to="/admin-panel"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            Access
          </Link>
        </div>
      )}

      {/* Volume Control */}
      <h2 className="font-bold mb-2">Volume</h2>
      <div className="mb-6 p-4 backdrop-blur-2xl bg-[#00000056] rounded-lg flex items-center">
        <div className="h-6 w-6 mr-3 text-gray-300">
          {vol > 0 ? <Volume2 /> : <VolumeOff />}
        </div>
        <input
          onChange={handleVol}
          className="w-full cursor-pointer appearance-none bg-gray-700 rounded-lg h-2"
          type="range"
          min={0}
          max={100}
          value={vol}
        />
        <p className="ml-3 text-sm text-gray-300">{`${vol}%`}</p>
      </div>

      {/* 🔥 Updated Profile Setting UI */}
      <h2 className="font-bold mb-2">Profile Settings</h2>
      <div className="p-4 backdrop-blur-2xl rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <UserCircle className="h-6 w-6 text-gray-300 mr-3" />
          <p className="text-sm">
            Manage your personal details and preferences.
          </p>
        </div>
        <Link
          to={`/profile/${currentUser.userID}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Settings;

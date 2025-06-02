import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets.js";
import { AuthContext } from "@/context/authContext";

const ProfileDropdown = () => {
  const [isProfile, setIsProfile] = useState(false);
  const profileDropdownRef = useRef(null);
  const { pathname } = useLocation();

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleProfile = () => {
    setIsProfile(!isProfile);
  };

  //   Close
  useEffect(() => {
    setIsProfile(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    // Implement your sign-out logic here
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="">
      <img
        className="h-[35px] w-[35px] object-fill border rounded-full hover:ring-2 cursor-pointer"
        src={assets.defaultProfile}
        alt="User Profile"
        onClick={toggleProfile}
        aria-expanded={isProfile}
        aria-controls="profile-dropdown"
      />
      {isProfile && (
        <div
          ref={profileDropdownRef}
          id="profile-dropdown"
          className="absolute  right-10 top-14 rounded backdrop-blur-2xl z-40 overflow-hidden"
        >
          <div className="flex flex-col text-white">
            <Link
              className="hover:bg-white hover:text-black px-3 py-1 flex flex-col"
              to={`/profile/${currentUser.userID}`}
            >
              <span className="font-bold">{currentUser.username}</span>
              <span className="text-gray-400">{currentUser.email}</span>
            </Link>
            <Link
              className="hover:bg-white hover:text-black px-3 py-1 font-bold"
              to={`/profile/${currentUser.userID}/settings`}
            >
              User settings
            </Link>
            <div
              className="hover:bg-white px-3 py-1 font-bold text-red-800 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign out
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

import React, { useContext, useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/authContext";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import axios from "axios";
import { BASE_URL } from "@/global/baseurl";

const UserProfile = () => {
  useDocumentTitle("TuneHub | Profile");

  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(true); // Initially, inputs are disabled

  // State for editable fields
  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    console.log(currentUser);
  }, [currentUser]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Update Profile Function
  const handleUpdateProfile = async () => {
    if (isEdit) {
      setIsEdit(false); // Enable input fields
    } else {
      try {
        setLoading(true);
        const res = await axios.post(
          `${BASE_URL}/api/v1/users/edituser`,
          {
            userID: currentUser.userID,
            username,
            email,
          }
        );

        // Update AuthContext with new user info
        setCurrentUser((prev) => ({ ...prev, username, email }));

        alert(res.data.message);
        console.log("api response", res.data);
        setIsEdit(true); // Disable inputs after saving
      } catch (error) {
        alert(error.response?.data?.message || "Error updating profile");
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-xl text-white font-bold">Profile Information</h1>
      <div>
        <div className="mb-5">
          <p className="text-sm text-white">
            Update your account details here.
          </p>
        </div>
        <div className="mb-4">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={assets.defaultProfile || "https://via.placeholder.com/150"}
            alt="profile"
          />
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <h3 className="font-bold">Username</h3>
          <input
            type="text"
            value={username}
            disabled={isEdit}
            onChange={(e) => setUsername(e.target.value)}
            className={`backdrop-blur-2xl border rounded-md py-1 px-2 w-full ${
              isEdit ? " cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <h3 className="font-bold">Email</h3>
          <input
            type="text"
            value={email}
            disabled={isEdit}
            onChange={(e) => setEmail(e.target.value)}
            className={`backdrop-blur-2xl border rounded-md py-1 px-2 w-full ${
              isEdit ? " cursor-not-allowed" : ""
            }`}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4 font-bold">
        <button
          className="bg-white text-black px-3 py-2 rounded-md cursor-pointer w-full"
          onClick={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? "Saving..." : isEdit ? "Edit Profile" : "Save Changes"}
        </button>
        <button
          className="bg-red-500 px-3 py-2 rounded-md cursor-pointer w-full"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

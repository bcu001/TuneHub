import useDocumentTitle from "@/hooks/useDocumentTitle";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, UserCheck, ShieldCheck } from "lucide-react";
import { BASE_URL } from "@/global/baseurl";

const editURL = `${BASE_URL}/api/v1/user`; // Base URL

const AdminPanel = () => {
  useDocumentTitle("TuneHub | Admin Panel");

  // State to store users
  const [users, setUsers] = useState([]);

  // Fetch users from database
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${editURL}/getusers`);
      setUsers(response.data.users); // Matches backend response structure
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Please try again.");
    }
  };

  // Delete user (uses DELETE method but sends data in request BODY)
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${editURL}/deleteUser`, { data: { userID: userId } }); // Sends userID in body
      setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userId));
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  // Change user role (Admin/User)
  const toggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      await axios.patch(`${editURL}/editrole`, { userID: userId, role: newRole });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userID === userId ? { ...user, role: newRole } : user
        )
      );
      alert(`User role updated to ${newRole}.`);
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Failed to update user role.");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Users List */}
      <div className="backdrop-blur-2xl p-4 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Users List</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li
                key={user.userID}
                className="flex justify-between items-center border backdrop-blur-3xl p-3 rounded-md mb-2 shadow"
              >
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm">{user.email}</p>
                  <p className="text-xs">
                    Role: {user.role === "admin" ? "Admin" : "User"}
                  </p>
                </div>
                <div className="flex gap-2">
                  {/* Change Role Button */}
                  <button
                    onClick={() => toggleUserRole(user.userID, user.role)}
                    className={`px-3 py-1 rounded-md flex items-center gap-1 ${
                      user.role === "admin"
                        ? "bg-gray-500 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {user.role === "admin" ? (
                      <UserCheck size={18} />
                    ) : (
                      <ShieldCheck size={18} />
                    )}
                    {user.role === "admin" ? "Demote" : "Promote"}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteUser(user.userID)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1"
                  >
                    <Trash2 size={18} /> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

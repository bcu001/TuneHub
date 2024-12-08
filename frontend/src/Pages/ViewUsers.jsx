import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import AdminNavbar from "./components/AdminNavbar";
import UserCard from "./components/UserCard";

const ViewUsers = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [error, setError] = useState(null); // State to handle errors

  const handleViewUsers = async () => {
    console.log("Viewing Users data");
    try {
      const response = await fetch("http://localhost:3000/users");
      // Fetch data from backend
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON response
      setUsers(data); // Update the users state with the fetched data
    } catch (err) {
      console.error("Error fetching users:", err.message);
      setError(err.message); // Handle errors
    }
  };

  return (
    <>
      <AdminNavbar />
      <div id="manage-users" className=" bg-yellow-300 calc-h flex text-black">
        <div
          id="sidebar-option"
          className="bg-green-400 w-[100px] h-full py-4 flex items-center flex-col justify-evenly text-inherit"
        >
          <div
            className="h-[50px] w-[75px] text-center bg-orange-400 rounded-md hover:scale-105 transition-all duration-300 cursor-pointer font-bold"
            onClick={handleViewUsers}
          >
            View Users
          </div>
          <div className="h-[50px] w-[75px] text-center bg-orange-400 rounded-md hover:scale-105 transition-all duration-300 cursor-pointer font-bold">
            Modify Users
          </div>
          <div className="h-[50px] w-[75px] text-center bg-orange-400 rounded-md hover:scale-105 transition-all duration-300 cursor-pointer font-bold">
            Remove Users
          </div>
        </div>
        <div id="sidebar" className="bg-pink-600 w-full h-full overflow-auto">
          <SearchBar />
          {error && <p>Error: {error}</p>} {/* Show error if any */}
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.userID}>
                <UserCard
                  userID={user.userID}
                  username={user.username}
                  email={user.email}
                  role={user.role}
                  registrationDate={user.registrationDate}
                />
              </div>
            ))
          ) : (
            <p>No users to display</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewUsers;

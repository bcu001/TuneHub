import React from "react";
import { assets } from "../assets/assets";

const AdminNavbar = () => {
  return (
    <>
      <nav className="bg-purple-500 p-1 h-[60px] ">
        <ul className="flex items-center justify-between">
          <li>
            <img
              src={assets.logo}
              alt="logo"
              className="w-12 rounded-full cursor-pointer
          "
            />
          </li>
          <li>
            <img
              src={assets.defaultProfile}
              alt="logo"
              className="w-12 h-12 rounded-full object-fill cursor-pointer"
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNavbar;

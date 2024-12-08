import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav
        id="navbar"
        className="font-bold p-1 flex items-center justify-between mb-5 border-b-[3px] border-black"
      >
        <ul className="flex gap-10 items-center">
          <li className="cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/ranking">Ranking</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div>
          <img
            src={assets.defaultProfile}
            alt="logo"
            className="w-12 h-12 rounded-full object-fill cursor-pointer"
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AudioLines } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown.jsx";
import NavigationDropdown from "./NavigationDropdown.jsx";
import SearchBar from "@/components/searchBar/SearchBar.jsx";

const Navbar = () => {
  useEffect(() => {
    handleKeyShortcut();
  }, []);

  const handleKeyShortcut = () => {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        document.getElementById("searchBar").focus();
      }
    });
  };
  return (
    <nav className="sticky bg-green-400 w-[95vw] z-50 mx-auto my-3 rounded-md shadow-lg ">
      <div className="relative flex items-center justify-evenly w-full gap-5 px-5 py-2 z-50">
        {/* Logo */}
        <Link className="text-black hover:text-white" to={"/"}>
          <AudioLines
            className="hover:scale-125 transition-all duration-300"
            size={30}
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-grow relative">
          <SearchBar />
        </div>

        {/* Profile */}
        <ProfileDropdown />

        {/* Navigation Menu */}
        <NavigationDropdown />
      </div>
    </nav>
  );
};

export default Navbar;

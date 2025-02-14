import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Album,
  Home,
  ListMusic,
  Settings,
  Search,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { title: "Home", url: "/", icon: <Home className="mr-2" /> },
  { title: "Playlist", url: "/playlist", icon: <ListMusic className="mr-2" /> },
  { title: "Albums", url: "/albums", icon: <Album className="mr-2" /> },
  { title: "Search", url: "/search", icon: <Search className="mr-2" /> },
  { title: "Settings", url: "/settings", icon: <Settings className="mr-2" /> },
];

const NavigationDropdown = () => {
  const [isNavigate, setNavigate] = useState(false);

  const toggleNavigate = () => {
    setNavigate(!isNavigate);
  };

  // Close the dropdown menu when route change
  const { pathname } = useLocation();
  useEffect(() => {
    setNavigate(false);
  }, [pathname, setNavigate]);

  const navDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navDropdownRef.current &&
        !navDropdownRef.current.contains(event.target)
      ) {
        setNavigate(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Navigation Toggle */}
      <div
        className={`cursor-pointer relative ${
          isNavigate ? "rotate-90" : "rotate-0"
        } transition-transform duration-300 text-white`}
        onClick={toggleNavigate}
      >
        {isNavigate ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Navigation Menu depend on state of Naviation button */}
      {isNavigate && (
        <div
          ref={navDropdownRef}
          className={`absolute top-16 right-3 rounded overflow-hidden w-[50%] mx-5 flex flex-col z-40 duration-300 bg-green-400  ${
            isNavigate
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
          role="menu"
          aria-expanded={isNavigate}
        >
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={index}
              to={item.url}
              className={`flex items-center px-3 py-2 transition-colors duration-300 text-black ${
                pathname === item.url
                  ? "bg-blue-100 border-l-4 border-blue-400 font-bold"
                  : "hover:bg-gray-200"
              }`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationDropdown;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Album, Home, ListMusic, Settings, Search, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { title: "Home", url: "/", icon: <Home className="mr-2" /> },
  { title: "Playlist", url: "/playlist", icon: <ListMusic className="mr-2" /> },
  { title: "Search", url: "/search", icon: <Search className="mr-2" /> },
  { title: "Settings", url: "/settings", icon: <Settings className="mr-2" /> },
];

const NavigationDropdown = () => {
  const [isNavigate, setNavigate] = useState(false);
  const navDropdownRef = useRef(null);
  const { pathname } = useLocation();

  const toggleNavigate = () => setNavigate((prev) => !prev);

  useEffect(() => {
    setNavigate(false); // Close dropdown on route change
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target)) {
        setNavigate(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Menu Toggle Button */}
      <div
        className="cursor-pointer text-white transition-transform duration-300"
        onClick={toggleNavigate}
      >
        {isNavigate ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Dropdown Navigation */}
      {isNavigate && (
        <div
          ref={navDropdownRef}
          className="absolute top-14 right-3 w-52 bg-gray-900/70 backdrop-blur-2xl shadow-lg rounded-lg overflow-hidden z-40 animate-fade-in"
          role="menu"
          aria-expanded={isNavigate}
        >
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={index}
              to={item.url}
              className={`flex items-center px-4 py-3 text-white text-sm font-medium transition-all duration-300 ${
                pathname === item.url
                  ? "bg-blue-500 font-bold"
                  : "hover:bg-gray-700 active:bg-gray-600"
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

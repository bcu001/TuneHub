import React, { useContext, useState } from "react";
import { assets } from "@/assets/assets.js";
import {
  Album,
  Home,
  ListMusic,
  Search,
  Settings,
  PanelRightOpen,
  PanelRight,
  AudioLines,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "@/context/authContext";

const NAV_ITEMS = [
  { title: "Home", url: "/", icon: Home },
  { title: "Playlist", url: "/playlist", icon: ListMusic },
  { title: "Albums", url: "/albums", icon: Album },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

const Sidebar = () => {
  const [isSidebar, setIsSidebar] = useState(false);
  const { pathname } = useLocation();
  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  const { currentUser } = useContext(AuthContext);

  return (
    <div
      className={`bg-green-400 h-[95vh] flex flex-col justify-between my-auto mx-4 rounded-md sticky top-0 p-4 transition-all duration-300 ease-in-out overflow-hidden shadow-lgI ${
        isSidebar ? "w-[250px]" : "w-[80px]"
      }`}
    >
      {/* Sidebar Header */}
      <div
        className={`top-0 left-0  mt-3 absolute w-full rounded flex items-center transition-all duration-300 ease-in-out  ${
          isSidebar ? "justify-between px-5" : "flex-col gap-3 justify-center"
        }`}
      >
        <Link className=" text-black hover:text-white" to={"/"}>
          <AudioLines
            className="hover:scale-125 transition-all duration-300"
            size={30}
          />
        </Link>
        {/* Collapse Toggle */}
        <div
          className={` cursor-pointer text-sm bg-gray-700 text-white px-2 py-1 rounded-md hover:bg-gray-600`}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {isSidebar ? <PanelRightOpen size={25} /> : <PanelRight size={25} />}
        </div>
      </div>

      {/* Navigation Content */}
      <nav
        className={` flex flex-col  h-full overflow-auto mb-3 transition-all duration-300 ease-in-out ${
          isSidebar ? "mt-16" : "mt-24"
        }`}
      >
        {/* Sidebar Items */}
        <div className="flex-1 overflow-auto text-black">
          {NAV_ITEMS.map((item, index) => (
            <Link
              to={item.url}
              key={index}
              className={`mb-4 flex items-center gap-2 px-2 py-2 border-blue-400 overflow-hidden transition-all rounded-sm ${
                isSidebar ? "justify-start text-base" : "justify-center text-sm"
              } ${
                pathname === item.url
                  ? "border-l-4 font-bold bg-blue-100 text-black"
                  : ""
              }`}
            >
              <item.icon className="w-6 h-6" />
              {isSidebar ? <span>{item.title}</span> : ""}
            </Link>
          ))}
        </div>
      </nav>
      {/* Profile Link */}
      <Link
        to={`/profile/${currentUser.userID}`}
        className={`flex items-center gap-2 rounded-sm transition-all duration-300 ease-in-out cursor-pointer ${
          isSidebar ? "justify-start bg-gray-100 p-2" : "justify-center"
        } `}
      >
        {/* Profile Avatar */}
        <img
          src={assets.defaultProfile}
          alt="Profile Avatar"
          className="h-[40px] w-[40px] rounded-full flex-shrink-0"
        />

        {/* Profile Details */}
        {isSidebar && (
          <div className="overflow-hidden">
            <div className="truncate w font-bold text-gray-800">
              {currentUser.username}
            </div>
            <div className="truncate text-xs text-gray-500 lowercase">
              {currentUser.email}
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default Sidebar;

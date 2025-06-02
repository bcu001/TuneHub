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
  CircleUserRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "@/context/authContext";
import { useMediaQuery } from "react-responsive";

const NAV_ITEMS = [
  { title: "Home", url: "/", icon: Home },
  { title: "Playlist", url: "/playlist", icon: ListMusic },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

const Sidebar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isSidebar, setIsSidebar] = useState(!isMobile);
  const { pathname } = useLocation();
  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="h-screen flex items-center justify-center p-2 text-white">
      <div
        className={`relative h-full shrink-0 flex flex-col justify-between rounded-md p-4 duration-300 ease-in-out overflow-hidden backdrop-blur-[14px]  ${
          isSidebar ? "w-[250px]" : "w-[80px]"
        }`}
      >
        {/* Sidebar Header */}
        <div
          className={`top-0 left-0 mt-3 absolute w-full rounded flex items-center duration-300 ease-in-out  ${
            isSidebar ? "justify-between px-5" : "flex-col gap-3 justify-center"
          }`}
        >
          <Link className="" to={"/"}>
            <AudioLines className="hover:scale-125 duration-300" size={30} />
          </Link>
          {/* Collapse Toggle */}
          <div
            className="cursor-pointer text-sm text-[#6B6B6B] hover:text-white duration-500 ease-in-out px-2 py-1 rounded-md "
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            {isSidebar ? (
              <PanelRightOpen size={22} />
            ) : (
              <PanelRight size={22} />
            )}
          </div>
        </div>

        {/* Navigation Content */}
        <nav
          className={`flex flex-col h-full text-[#6B6B6B] overflow-auto mb-3 duration-500 ease-in-out ${
            isSidebar ? "mt-16" : "mt-24"
          }`}
        >
          {/* Sidebar Items */}
          <div className="flex-1 overflow-auto ">
            {NAV_ITEMS.map((item, index) => (
              <Link
                to={item.url}
                key={index}
                className={`mb-4 flex items-center gap-2.5 p-2.5 overflow-hidden duration-300 ease-in-out rounded
                  hover:text-white ${
                  isSidebar
                    ? "justify-start text-base"
                    : "justify-center text-sm"
                } ${
                  pathname === item.url
                    ? "purpleGhost text-white"
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
          className={`flex items-center gap-2 rounded-md  duration-300 ease-in-out cursor-pointer ${
            isSidebar ? "justify-start p-2 " : "justify-center"
          } `}
        >
          {/* Profile Avatar */}
          {/* <img
            src={assets.defaultProfile}
            alt="Profile Avatar"
            className="h-[40px] w-[40px] rounded-full flex-shrink-0"
          /> */}
          <div className="w-6 h-6">
          {<CircleUserRound/>}
          </div>

          {/* Profile Details */}
          {isSidebar && (
            <div className="overflow-hidden">
              <div className="truncate font-bold ">{currentUser.username}</div>
              <div className="truncate text-xs text-gray-500 lowercase">
                {currentUser.email}
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

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

const Sidebar_v2 = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isSidebar, setIsSidebar] = useState(!isMobile);
  const { pathname } = useLocation();
  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="h-screen flex items-center justify-center  text-white bg-surface-dark">
      <div
        className={`relative h-full shrink-0 flex flex-col justify-between duration-300 ease-in-out overflow-hidden  ${
          isSidebar ? "w-[250px]" : "w-[80px]"
        }`}
      >
        <div
          className={`top-0 left-0 mt-3 absolute w-full rounded  flex items-center duration-300 ease-in-out  ${
            isSidebar ? "justify-between px-2" : "flex-col gap-3 justify-center"
          }`}
        >
          <Link className="" to={"/"}>
            <AudioLines className="hover:scale-125 duration-300" size={30} />
          </Link>

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

        <nav
          className={`flex flex-col h-full text-[#6B6B6B] overflow-auto p-2 mb-3 duration-500 ease-in-out ${
            isSidebar ? "mt-16" : "mt-24"
          }`}
        >
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
                  } ${pathname === item.url ? "purpleGhost text-white" : ""}`}
              >
                <item.icon className="w-6 h-6" />
                {isSidebar ? <span>{item.title}</span> : ""}
              </Link>
            ))}
          </div>
        </nav>

        <Link
          to={`/profile/${currentUser.userID}`}
          className={`flex items-center p-2 gap-2 duration-300 ease-in-out cursor-pointer border-t border-gray-800 ${
            isSidebar ? "justify-start  " : "justify-center"
          } `}
        >
          {/* <img
            src={assets.defaultProfile}
            alt="Profile Avatar"
            className="h-[40px] w-[40px] rounded-full flex-shrink-0"
          /> */}
          <div className="w-6 h-6">{<CircleUserRound />}</div>

          {isSidebar && (
            <div className="overflow-hidden">
              <div className="truncate font-bold capitalize">
                {currentUser.name}
              </div>
              <div className="truncate text-xs text-gray-500 capitalize">
                {currentUser.email}
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar_v2;

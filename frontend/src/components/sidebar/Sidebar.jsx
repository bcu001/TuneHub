import React, { useState } from "react";
import { IoHeadset } from "react-icons/io5";
import { RiMenuUnfold3Line, RiMenuUnfold4Line } from "react-icons/ri";
import { GoHome } from "react-icons/go";
import { PiRanking } from "react-icons/pi";
import { FaRegMessage, FaRegUser } from "react-icons/fa6";

// Import the SidebarItem Component
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <aside
      className="bg-[var(--input-bg)] text-[var(--text-color)] h-screen border-r-[1px] border-[var(--input-border)] flex flex-col justify-between items-start p-3"
      style={{
        width: isSidebarOpen ? "155px" : "90px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="flex flex-col gap-10 items-start">
        {/* Toggle for sidebar */}
        <div
          className="cursor-pointer"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          {isSidebarOpen ? (
            <RiMenuUnfold4Line size={25} />
          ) : (
            <RiMenuUnfold3Line size={25} />
          )}
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col  gap-10">
          <SidebarItem
            to="/"
            icon={GoHome}
            iconSize={25}
            label="Home"
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/ranking"
            icon={PiRanking}
            iconSize={25}
            label="Ranking"
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/contact"
            icon={FaRegMessage}
            iconSize={20}
            label="Contact"
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/profile/user"
            icon={FaRegUser}
            iconSize={20}
            label="Profile"
            isSidebarOpen={isSidebarOpen}
          />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

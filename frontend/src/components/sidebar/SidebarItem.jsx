import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ to, icon: Icon, label, isSidebarOpen, iconSize }) => {
  return (
    <Link
      to={to}
      className="rounded transition-all duration-300 ease-in-out px-4 py-2 text-[var(--text-color) hover:bg-[var(--input-hover)] hover:text-white "
    >
      <div className="flex items-center gap-3">
        <Icon size={iconSize} />
        {isSidebarOpen && <span>{label}</span>}
      </div>
    </Link>
  );
};

export default SidebarItem;

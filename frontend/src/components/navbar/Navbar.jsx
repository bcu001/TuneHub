import React, { useState } from "react";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  const [isSettingOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 py-3 pr-3 transition-all duration-1000">
      {/* Search Bar */}
      <div className="w-full sm:w-auto">
        <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;

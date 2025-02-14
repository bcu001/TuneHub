import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AudioLines } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown.jsx";
import NavigationDropdown from "./NavigationDropdown.jsx";
import SearchBar from "@/components/search/SearchBar.jsx";

import { MusicPlayerContext } from "@/context/MusicPlayerContext.jsx";
import { useScroll } from "framer-motion";

const Navbar = () => {
  const { playPause, isPlaying } = useContext(MusicPlayerContext);
  const { scrollYProgress } = useScroll()
  const test = ()=>{
    console.log(scrollYProgress);
  }

  return (
    <nav id="navbar" className={`fixed top-0 w-full z-50 bg-blue-600  `}>
      <div className="relative flex items-center justify-between px-5 py-2 ">
        {/* Left side */}
        <Link className="text-[black] flex items-center gap-2" to={"/"}>
          <AudioLines
            className="hover:scale-125 hover:text-blue-500 duration-300"
            size={30}
          />
          {/* <span className="font-bold text-xl md:block hidden">TuneHub</span> */}
        </Link>

        
        {/* //SearchBar */}
        <div className="mx-3">
          <SearchBar />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Profile */}
          <ProfileDropdown />

          {/* Navigation Menu */}
          <NavigationDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

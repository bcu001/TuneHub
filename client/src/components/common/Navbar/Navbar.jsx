import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AudioLines, Search } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown.jsx";
import NavigationDropdown from "./NavigationDropdown.jsx";
import SearchBar from "@/components/search/SearchBar.jsx";

import { MusicPlayerContext } from "@/context/MusicPlayerContext.jsx";
import { useScroll } from "framer-motion";

const Navbar = () => {
  const { playPause, isPlaying } = useContext(MusicPlayerContext);
  const { scrollYProgress } = useScroll();
  const test = () => {
    console.log(scrollYProgress);
  };

  return (
    <nav id="navbar" className={` w-full z-50 backdrop-blur-2xl text-white`}>
      <div className="relative flex items-center justify-between px-5 py-2 ">
        {/* Left side */}
        <Link className=" flex items-center gap-2" to={"/"}>
          <AudioLines
            className="hover:scale-125 duration-300"
            size={30}
          />
          <span className="font-bold text-xl md:block hidden">TuneHub</span>
        </Link>

        <div className="flex items-center gap-x-5">
          <Link to={`/search`}>
            <Search />
          </Link>
          <NavigationDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

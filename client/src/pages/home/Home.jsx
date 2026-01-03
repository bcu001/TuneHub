import React, { useState, useEffect, useContext } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import TrendingCategories from "@/components/others/TrendingCategories";
import Footer from "@/components/common/Footer";
import MainPlayer from "@/components/musicPlayer/MainPlayer";
import Top10Songs from "@/components/others/Top10Songs";
import ProfileDropdown from "@/components/common/Navbar/ProfileDropdown";
import { useMediaQuery } from "react-responsive";
import SearchBar_v2 from "@/components/search/SearchBar_v2";

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useDocumentTitle("TuneHub");

  return (
    <div className={`w-full relative px-3 lg:px-0`}>
      {isMobile || (
        <div className="flex items-center justify-center mt-6 pr-5 gap-x-10 sticky top-2  z-50">
          <div className="grow">
            <SearchBar_v2 />
          </div>
          <ProfileDropdown />
        </div>
      )}
      <div className="flex items-center justify-center py-5 gap-x-10">
        {/* <HeroSectiona /> */}
        <div>
          <MainPlayer />
        </div>
      </div>
      <div>
        <TrendingCategories />
      </div>
      <div>
        <Top10Songs />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

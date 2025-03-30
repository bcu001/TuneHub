import React, { useState, useEffect, useContext } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import useLoadSongs from "@/hooks/useLoadSongs";

// components
import TrendingCategories from "@/components/others/TrendingCategories";
import SearchBar from "@/components/search/SearchBar";
import Footer from "@/components/common/Footer";
import MainPlayer from "@/components/musicPlayer/MainPlayer";
import HeroSectiona from "@/components/others/HeroSectiona";
import Top10Songs from "@/components/others/Top10Songs";
import ProfileDropdown from "@/components/common/Navbar/ProfileDropdown";

import { useMediaQuery } from "react-responsive";

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useDocumentTitle("TuneHub");
  const {
    data: tenSongs,
    loading,
    error,
  } = useFetch("http://localhost:8000/api/v1/songs/top10");

  useLoadSongs(tenSongs.data);

  return (
    <div className="w-full relative">
      {isMobile || (
        <div className="flex items-center justify-center mt-6 pr-5 gap-x-10 sticky top-2  z-50">
          <div className="grow">
            <SearchBar />
          </div>
          <ProfileDropdown />
        </div>
      )}
      <div className="flex items-center justify-center py-5 gap-x-10">
        <HeroSectiona />
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

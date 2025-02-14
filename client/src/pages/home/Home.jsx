import React, { useState, useEffect } from "react";
import axios from "axios";
import HeroSection from "@/components/others/HeroSection";
import FeaturedSongs from "@/components/others/FeaturedSongs";
import NewReleases from "@/components/others/NewReleases";
import TrendingCategories from "@/components/others/TrendingCategories";
import SearchBar from "@/components/search/SearchBar";
import Footer from "@/components/common/Footer";

//data
import song from "@/database/song.json";

const Home = () => {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <div className=" flex justify-center my-10">
        <SearchBar />
      </div>

      <div className="mx-2">
        <FeaturedSongs />
        <NewReleases />
        <TrendingCategories />
      </div>
      <div className="mx-2 ">
      <Footer/>
      </div>
    </div>
  );
};

export default Home;

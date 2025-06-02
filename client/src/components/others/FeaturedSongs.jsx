import React from "react";
import useFetch from "@/hooks/useFetch";
import { motion, AnimatePresence } from "framer-motion";
import NewCard from "../cards/NewCard";

const FeaturedSongs = () => {
  const {
    data: fsongData,
    loading,
    error,
  } = useFetch("http://localhost:8000/api/v1/songs/featuredSongs");

  // console.log("API Response:", fsongData);

  if (loading) return <p>Loading featured songs...</p>;
  if (error) return <p>Error loading featured songs: {error}</p>;
  if (!fsongData || !fsongData.data || fsongData.data.length === 0)
    return <p>No featured songs available.</p>;

  const featuredSongs = fsongData.data;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 overflow-hidden">
        Featured Songs
      </h2>
      <div className="p-5 gap-10 overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredSongs.map((song) => (
          <div className="" key={song.songID}>
            <NewCard song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSongs;

import React from "react";
import useFetch from "@/hooks/useFetch";
import { motion } from "framer-motion";
import NewCard from "../cards/NewCard";
import RecCard from "../cards/RecCard";

const Top10Songs = () => {
  const {
    data: tenSongs,
    loading,
    error,
  } = useFetch("http://localhost:8000/api/v1/songs/top10");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!tenSongs || tenSongs.data.length === 0) return <p>No songs available</p>;

  return (
    <div>
      <h2 className="text-4xl font-bold text-white my-6 ">Trending Songs</h2>
      <div className="space-y-5 mr-2">
        {tenSongs.data.map((song) => (
          <RecCard key={song.songID} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Top10Songs;

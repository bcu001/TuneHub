import React from "react";
import useFetch from "@/hooks/useFetch";
import { assets } from "@/assets/assets";

const HeroSection = () => {
  // Fetching the top-ranking song
  const {
    data: songs,
    loading,
    error,
  } = useFetch("http://localhost:8000/api/v1/songs/top");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!songs || songs.length === 0) return <p>No songs available</p>;

  return (
    <div className="relative w-full h-full bg-white">
      <div className="absolute h-full w-full inset-0">
        <img
          src={assets.defaultProfile} // Use song thumbnail if available
          alt={songs.data[0].songName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75" />
        <div className="absolute bottom-5 left-0 right-0 p-8 text-white">
          <h2 className="text-4xl font-bold mb-2 truncate">
            {songs.data[0].songName}
          </h2>
          <p className="text-xl mb-4 truncate">{songs.data[0].artist}</p>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => console.log(`Playing: ${songs.data[0].songName}`)}
          >
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

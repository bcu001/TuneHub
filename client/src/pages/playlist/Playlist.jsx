import { assets } from "@/assets/assets";
import React from "react";

// Sample Data
const playlists = [
  {
    id: 1,
    name: "Chill Vibes",
    numOfSongs: 25,
    totalDuration: "1h 45m",
    thumbnail: assets.defaultProfile,
  },
  {
    id: 2,
    name: "Workout Hits",
    numOfSongs: 18,
    totalDuration: "1h 10m",
    thumbnail: assets.defaultProfile,
  },
  {
    id: 3,
    name: "Road Trip",
    numOfSongs: 30,
    totalDuration: "2h 30m",
    thumbnail: assets.defaultProfile,
  },
  {
    id: 4,
    name: "Party Mix",
    numOfSongs: 40,
    totalDuration: "3h 15m",
    thumbnail: assets.defaultProfile,
  },
];

const Playlist = () => {
  return (
    <div className="user-playlists-container p-5 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Playlists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="playlist-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={playlist.thumbnail}
              alt={playlist.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold">{playlist.name}</h2>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Songs:</span> {playlist.numOfSongs}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Duration:</span>{" "}
              {playlist.totalDuration}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;

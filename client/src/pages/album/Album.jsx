import React from "react";
import "./Album.css";
import { assets } from "@/assets/assets";

// Dummy Data for Albums
const albums = [
  {
    id: 1,
    name: "Thriller",
    artist: "Michael Jackson",
    releaseYear: 1982,
    thumbnail: assets.defaultProfile,
  },
  {
    id: 2,
    name: "Back in Black",
    artist: "AC/DC",
    releaseYear: 1980,
    thumbnail: assets.defaultProfile,
  },
  {
    id: 3,
    name: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    releaseYear: 1973,
    thumbnail: assets.defaultProfile,
  },
  {
    id: 4,
    name: "Rumours",
    artist: "Fleetwood Mac",
    releaseYear: 1977,
    thumbnail: assets.defaultProfile,
  },
];

const Album = () => {
  return (
    <div className="albums-page-container p-5 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Albums</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            className="album-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={album.thumbnail}
              alt={album.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold">{album.name}</h2>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Artist:</span> {album.artist}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Release Year:</span>{" "}
              {album.releaseYear}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;

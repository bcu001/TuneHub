import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const RankingCard = ({ song, index }) => {
  return (
    <div className="song-card flex items-center justify-evenly bg-white shadow-sm rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="mr-4 font-bold text-5xl">{index + 1}</div>
      <div className="song-details w-9/12">
        <h2 className="text-lg font-semibold truncate w-full">
          {song.songName}
        </h2>
        <p className="text-sm text-gray-600 truncate">
          <span className="font-bold">Artist:</span> {song.artist}
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-x-1 truncate">
          <span className="font-bold">Likes:</span>
          <span className="flex items-center gap-x-1 truncate">
            <Heart size={15} className="text-pink-400" />
            <span>{song.likes}</span>
          </span>
        </p>
        <p className="text-sm text-gray-600 truncate">
          <span className="font-bold">Duration:</span> {song.duration}
        </p>
      </div>
      <Link
        className="border p-1 rounded-full bg-green-400 hover:scale-105 active:scale-95"
        to={`/player/${song.songID}`}
      >
        Play
      </Link>
    </div>
  );
};

export default RankingCard;

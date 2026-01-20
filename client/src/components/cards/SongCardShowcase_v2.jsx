import { assets } from "@/assets/assets";
import { Play } from "lucide-react";
import React, { useContext } from "react";
import { MusicPlayerContext } from "@/context/MusicPlayerContext";
import { Heart } from "lucide-react";
import normalizeLike from "@/utilities/normalizeLike";
import {Link} from "react-router-dom";

const RecCard = ({ song, index }) => {


  return (
    <Link to={`/song/${song._id}`} className=" grid grid-cols-4 bg-surface-dark text-text-main-dark border-b border-gray-800 p-2">
      <div className="flex items-center text-lg font-bold text-text-sec-dark">
        {index + 1}
      </div>
      <div className="flex items-center">
        <img
          className="w-16 h-16 aspect-square"
          src={assets.defaultMusic}
          alt="Song Thumbnail"
        />
        <div className="grow px-2 overflow-hidden">
          <div className="truncate font-bold">{song.songName || "Title"}</div>
        </div>
      </div>
      <div className="flex items-center grow px-2 overflow-hidden">
        <div className="truncate font-bold">{song.artist || "Title"}</div>
      </div>
      <div className="flex items-center gap-2">
        <Heart color="red" />
        <div className="truncate">{normalizeLike(song.likes)}</div>
      </div>

      {/* <button
        className="bg-green-500 flex items-center justify-center gap-2 p-2 rounded-full hover:bg-green-600 hover:cursor-pointer"
        onClick={handlePlay}
      >
        <Play size={20} />
      </button> */}
    </Link >
  );
};

export default RecCard;

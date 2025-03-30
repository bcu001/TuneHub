import { assets } from "@/assets/assets";
import React from "react";

const NewCard = ({ song }) => {
  return (
    <div className="aspect-square w-[220px] relative flex items-center justify-center">
      {/* Background Circle */}
      <div className="absolute w-[110%] h-[110%] bg-green-400 rounded-full -z-10" />

      {/* Song Image */}
      <div className="w-full h-full">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={assets.defaultProfile}
          alt={song.songName || "Unknown Song"}
        />
      </div>

      {/* Song Info */}
      <div className="absolute bottom-0 w-full bg-black/60 text-white backdrop-blur-sm px-2 py-1 rounded-b-xl overflow-hidden">
        <div className="font-bold text-xl truncate">
          {song.songName || "Unknown"}
        </div>
        <div className="truncate text-sm">
          {song.artist || "Unknown Artist"}
        </div>
      </div>
    </div>
  );
};

export default NewCard;

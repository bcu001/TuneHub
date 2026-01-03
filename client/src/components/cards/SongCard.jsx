import React, { useState } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "@/assets/assets";

const SongCard = ({ song }) => {
  return (
    <div className="relative h-[200px] min-w-[200px] rounded-sm overflow-hidden">
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full" />
        <h1
          className="bg-white font-semibold text-sm z-10 p-2 rounded-full text-black flex items-center hover:cursor-pointer"
          onClick={() => {
            console.log("click");
          }}
        >
          <Link to={`/player/${song._id}`}>
            <Play />
          </Link>
        </h1>
        <div className="absolute bottom-0 flex flex-col w-full px-2">
          <span className=" font-bold truncate">{song.songName}</span>
          <span className="truncate">{song.artist}</span>
        </div>
      </div>

      <img
        src={assets.defaultMusic}
        alt="Fixed Card"
        className="object-cover h-full w-full "
      />
    </div>
  );
};

export default SongCard;

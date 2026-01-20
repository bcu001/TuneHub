import React, { useState } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "@/assets/assets";

const SongCard = ({ song }) => {
  return (
    <Link
      to={`/song/${song._id}`}
      className="relative h-[200px] min-w-[200px] rounded-sm overflow-hidden"
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full" />

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
    </Link>
  );
};

export default SongCard;

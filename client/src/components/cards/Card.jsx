import React from "react";
import { Play, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ song}) => {
  return (
    <div className={` aspect-square relative rounded-md bg-cover overflow-hidden flex items-end text-white`}
      style={{ backgroundImage: `url(${song.songImage})` }}>
      <div className=" px-2 pb-1 bg-[#0000008a] w-full ">
        <div className="truncate text-lg font-bold">{song.songName}</div>
        <div className="truncate">{song.writer}</div>
      </div>
      <Link to={`/player/${song.songID}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border bg-white text-black p-[6px] rounded-full hover:p-2">
        <Play />
      </Link>

    </div>
  );
};

export default FeatureCard;

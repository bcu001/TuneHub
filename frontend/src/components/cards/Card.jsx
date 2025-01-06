import React from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, artist, imageUrl }) => {
  return (
    <div className="relative group overflow-hidden">
      <div
        className="relative w-[200px] h-[200px] bg-cover bg-center rounded-md shadow-lg transition-all duration-300 ease-in-out cursor-pointer flex items-end group-hover:scale-105 overflow-hidden"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className=" p-2 text-white w-[200px] bg-[#0000009d]">
          <h3 className="text-lg font-bold truncate ">{title}</h3>
          <p className="text-sm">{artist}</p>
        </div>
      </div>

      <div className="bg-[#0000009d] w-[200px] h-[200px] absolute top-0 rounded-md hidden group-hover:flex cursor-pointer  items-center justify-center overflow-hidden">
        <Link
          to={"/"}
          className="bg-white grid items-center p-2 rounded-full hover:p-3 transition-all duration-300 ease-in-out"
        >
          <Play className="bg-white text-black" />
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;

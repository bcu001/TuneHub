import React from "react";
import { assets } from "../../assets/assets";

const FeatureCard = ({ title, artist, imageUrl }) => {
  return (
    <div
      className="relative w-[200px] h-[200px] bg-cover bg-center rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer flex items-end"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className=" p-2 text-white w-[200px]">
        <h3 className="text-lg font-bold truncate ">{title}</h3>
        <p className="text-sm">{artist}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

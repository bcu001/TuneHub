import React from "react";
import { assets } from "../../assets/assets";

const FeatureCard = ({ title, artist, imageUrl }) => {
  return (
    <div
      className="relative w-64 h-72 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{artist}</p>
      </div>
      <div className="absolute bottom-2 right-2">
        <button className="bg-[#ffffff21] backdrop-blur-md shadow-lg rounded-full p-2">
          <img src={assets.playBtn} alt="" width={25} />
        </button>
      </div>
    </div>
  );
};

export default FeatureCard;

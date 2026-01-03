import React, { useState } from "react";
import { Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "@/assets/assets";

const FixCard = ({ song }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      className="relative h-[200px] min-w-[200px] rounded-sm overflow-hidden"
      onHoverStart={() => {
        setShowOverlay(true);
      }}
      onHoverEnd={() => {
        setShowOverlay(false);
      }}
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="absolute inset-0 z-10 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full" />
            <motion.h1
              className="bg-white font-semibold text-sm z-10 p-2 rounded-full text-black flex items-center hover:cursor-pointer"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
              onClick={() => {
                console.log("click");
              }}
            >
              <Link to={`/player/${song.songID}`}>
                <Play />
              </Link>
            </motion.h1>
            <motion.div
              className="absolute bottom-0 flex flex-col w-full px-2"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
            >
              <span className=" font-bold truncate">{song.songName}</span>
              <span className="truncate">{song.artist}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <img
        src={ assets.defaultMusic}
        alt="Fixed Card"
        className="object-cover h-full w-full "
      />
    </motion.div>
  );
};

export default FixCard;

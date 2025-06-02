import React, { useState, useContext } from "react";
import {
  Play,
  SkipBack,
  SkipForward,
  Pause,
  X,
  ChevronUp,
  BoomBox,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { MusicPlayerContext } from "@/context/MusicPlayerContext";
import { assets } from "@/assets/assets";

const MainPlayer = () => {
  const {
    currSong,
    playPause,
    isPlaying,
    handleSkipBack,
    handleSkipForward,
    currDuration,
    updateCurrentDuration,
    totalDuration,
    isVisible,
    setIsVisible,
  } = useContext(MusicPlayerContext);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="fixed z-40  right-5 w-[400px]">
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        className={`text-white  rounded-lg font-bold cursor-pointer ${
          isVisible
            ? "absolute z-40 top-2 right-2"
            : "p-2 bg-red-500 right-0 absolute animate-pulse"
        }`}
      >
        {isVisible ? <X /> : <BoomBox />}
      </button>

      {isVisible && currSong && (
        <div className="">
          <div className="rounded-xl backdrop-blur-2xl text-white flex p-2 gap-x-2">
            <img
              src={assets.rock}
              alt="Album Art"
              className="aspect-square object-cover w-[150px] rounded-xl"
            />
            <div className="flex flex-col justify-between">
              <div id="song_Desc">
                <div className="font-extrabold text-2xl">
                  {currSong?.songName || "Unknown Song"}
                </div>
                <div className="font-semibold">
                  {currSong?.artist || "Unknown Artist"}
                </div>
              </div>
              <div>
                <div id="song_Dur" className="flex items-center">
                  <p className="text-sm font-bold w-17 mr-2 overflow-hidden">
                    {formatDuration(currDuration)}
                  </p>
                  <input
                    onChange={updateCurrentDuration}
                    className="w-full mr-3 cursor-pointer"
                    type="range"
                    min={0}
                    max={totalDuration || 100}
                    value={currDuration}
                  />
                  <p className="text-sm font-bold w-12">
                    {formatDuration(totalDuration)}
                  </p>
                </div>
                <div id="player_Btn" className="flex justify-around mt-3">
                  <div onClick={handleSkipBack} className="cursor-pointer">
                    <SkipBack />
                  </div>
                  <div className="cursor-pointer" onClick={playPause}>
                    {isPlaying ? <Pause /> : <Play />}
                  </div>
                  <div onClick={handleSkipForward} className="cursor-pointer">
                    <SkipForward />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPlayer;

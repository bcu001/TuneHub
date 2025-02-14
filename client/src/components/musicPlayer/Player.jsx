import React, { useEffect, useState, useRef } from "react";
import {
  Play,
  SkipBack,
  SkipForward,
  Heart,
  Music,
  Volume2,
  VolumeOff,
  Pause,
} from "lucide-react";
import song from "@/database/song.json";
import { useParams, Link } from "react-router-dom";

const Player = () => {
  const { songID } = useParams(); // Extract songID
  const [isPlay, setIsPlay] = useState(false);
  const [vol, setVol] = useState(100);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const cs = song.songs.find((s) => s.songID === songID);
    if (cs) {
      setCurrentSong(cs);
      audioRef.current.src = cs.songUrl;
    }
  }, [songID]);

  const handleVol = (e) => {
    const volume = e.target.value;
    setVol(volume);
    audioRef.current.volume = volume / 100;
  };

  const handlePlay = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    console.log(currentSong.songUrl);
    setIsPlay(!isPlay);
  };

  if (!currentSong) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full border border-red-400 h-full flex items-center justify-center">
      <div className=" max-w-[320px] mx-auto bg-white shadow-md rounded-lg overflow-hidden dark:bg-zinc-900 ">
        <div className="flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center w-full gap-x-5">
            <Music className="h-6 w-6 text-yellow-500" />
            <div className="w-8/12">
              <h3 className="font-bold truncate">{currentSong.songName}</h3>
              <p className="truncate">{currentSong.artist}</p>
            </div>

            <Heart className="h-6 w-6 text-red-500 cursor-pointer" />
          </div>
        </div>
        <div className="relative transition-all duration-300 ease-in-out">
          <img
            src={currentSong.songImage}
            alt={currentSong.songName}
            className="w-full h-40 object-cover"
          />
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center">
            <div className="h-6 w-6 mr-3">
              {vol > 0 ? <Volume2 /> : <VolumeOff />}
            </div>
            <input
              onChange={handleVol}
              className="w-full mr-3 cursor-pointer"
              type="range"
              name="volSet"
              id="volSet"
              min={0}
              max={100}
              value={vol}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 w-12">{`${vol}%`}</p>
          </div>
          <div className="flex justify-around text-sm text-gray-500 dark:text-gray-400 mt-3">
            <div className="cursor-pointer border border-zinc-900 rounded-full p-1 hover:dark:bg-zinc-800 transition-all duration-300 ease-in-out">
              <SkipBack />
            </div>
            <div
              className="cursor-pointer border border-zinc-900 rounded-full p-1 hover:dark:bg-zinc-800 transition-all duration-300 ease-in-out"
              onClick={handlePlay}
            >
              {isPlay ? <Pause /> : <Play />}
            </div>
            <div className="cursor-pointer border border-zinc-900 rounded-full p-1 hover:dark:bg-zinc-800 transition-all duration-300 ease-in-out">
              <SkipForward />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;

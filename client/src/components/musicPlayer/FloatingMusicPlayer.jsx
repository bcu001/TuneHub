import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import {
  Play,
  SkipBack,
  SkipForward,
  Heart,
  Music,
  Volume2,
  VolumeOff,
  Pause,
  CodeSquare,
} from "lucide-react";
import song from "@/database/song.json";
import { useParams, Link } from "react-router-dom";

import { MusicPlayerContext } from "@/context/MusicPlayerContext";
import Loading from "@/components/common/Loading/Loading";

const FloatingMusicPlayer = () => {
  const { songID } = useParams(); // Extract songID
  const [songList, SetSongList] = useState([]);

  //context
  const {
    currSongList,
    setCurrSongList,
    currSong,
    setCurrSong,
    handleSkipBack,
    handleSkipForward,
    playPause,
    isPlaying,
    setIsPlaying,
    handleVol,
    setAudioSrc,
    vol,
    setVol,
    handletest,
    currDuration,
    updateCurrentDuration,
    totalDuration,
  } = useContext(MusicPlayerContext);

  useEffect(() => {
    if (currSongList === null) {
      const lastSongList = JSON.parse(localStorage.getItem("lastSongList"));
      setCurrSongList(lastSongList);
    }
  }, []);

  useEffect(() => {
    getSongs();
  }, [songID]);

  const getSongs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/songs/getSongs");
      const resData = res.data;
      // console.log("getSongs: ", resData);

      SetSongList(resData); // Update song list state

      // Find the current song directly using the fetched data
      // console.log(songID , typeof songID)
      const cs = resData.find((s, idx) => s.songID.toString() === songID);
      if (cs) {
        setCurrSong(cs);
        setAudioSrc(cs);
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Error fetching songs:", err);
    }
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!currSong) {
    return (
      <div className="mt-16">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mt-16 md:m-auto text-white">
      <div className=" max-w-[320px] mx-auto bg-white shadow-md rounded-lg overflow-hidden dark:bg-zinc-900 ">
        <div className="flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center w-full gap-x-5">
            <Music className="h-6 w-6 text-yellow-500" />
            <div className="w-8/12">
              <h3 className="font-bold truncate">{currSong.songName}</h3>
              <p className="truncate">{currSong.artist}</p>
            </div>

            <Heart className="h-6 w-6 text-red-500 cursor-pointer" />
          </div>
        </div>
        <div className="relative transition-all duration-300 ease-in-out">
          <img
            src={currSong.songImage}
            alt={currSong.songName}
            className="w-full h-40 object-cover"
          />
        </div>
        <div className="px-6 py-4">

          {/* volume control */}
          {/* <div className="flex items-center">
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
          </div> */}
          <div className="flex items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 w-16 mr-2 overflow-hidden">{formatDuration(currDuration)}</p>
            <input
              onChange={updateCurrentDuration}
              className="w-full mr-3 cursor-pointer"
              type="range"
              name="volSet"
              id="volSet"
              min={0}
              max={totalDuration || 100}
              value={currDuration}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 w-12">{formatDuration(totalDuration)}</p>
          </div>
          <div className="flex justify-around text-sm text-gray-500 dark:text-gray-400 mt-3">
            <div
              onClick={handleSkipBack}
              className="cursor-pointer border border-zinc-900 rounded-full p-1 hover:dark:bg-zinc-800 transition-all duration-300 ease-in-out"
            >
              <SkipBack />
            </div>
            <div
              className="cursor-pointer border border-zinc-900 rounded-full p-1 hover:dark:bg-zinc-800 transition-all duration-300 ease-in-out"
              onClick={playPause}
            >
              {isPlaying ? <Pause /> : <Play />}
            </div>
            <div
              onClick={handleSkipForward}
              className="cursor-pointer border border-zinc-900 rounded-full p-1 hover:dark:bg-zinc-800 transition-all duration-300 ease-in-out"
            >
              <SkipForward />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingMusicPlayer;

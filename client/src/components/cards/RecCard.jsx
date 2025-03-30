import { assets } from "@/assets/assets";
import { Play } from "lucide-react";
import React, { useContext } from "react";
import { MusicPlayerContext } from "@/context/MusicPlayerContext";

const RecCard = ({ song }) => {
  const { setCurrSong, setIsPlaying, setAudioSrc, playSong, setIsVisible } =
    useContext(MusicPlayerContext);

  const handlePlay = () => {
    setCurrSong(song); // Set the clicked song as the current song
    setAudioSrc(song); // Set the audio source
    setIsPlaying(true); // Start playing
    setIsVisible(true);
    playSong();
  };

  return (
    <div className="flex gap-x-3 p-2 items-center rounded backdrop-blur-2xl text-white">
      <img
        className="w-16 h-16 aspect-square"
        src={assets.defaultMusic}
        alt="Song Thumbnail"
      />
      <div className="grow px-2 overflow-hidden">
        <div className="truncate font-bold">{song.songName || "Title"}</div>
        <div className="truncate">{song.artist || "Artist"}</div>
      </div>
      <button
        className="bg-green-500 flex items-center justify-center gap-2 p-2 rounded-full hover:bg-green-600 hover:cursor-pointer"
        onClick={handlePlay}
      >
        <Play size={20} />
      </button>
    </div>
  );
};

export default RecCard;

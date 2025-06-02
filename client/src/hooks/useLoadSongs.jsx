import { useEffect, useContext } from "react";
import { MusicPlayerContext } from "@/context/MusicPlayerContext";

const useLoadSongs = (songsData) => {
  const { setCurrSongList, setCurrSong, setAudioSrc, setIsPlaying } =
    useContext(MusicPlayerContext);

  useEffect(() => {
    if (songsData?.length > 0) {
      setCurrSongList(songsData);
      setCurrSong(songsData[0]); // Set first song as default
      setAudioSrc(songsData[0]); // Set audio source
      setIsPlaying(false);

      // ✅ Convert array to string before storing
      localStorage.setItem("lastSongList", JSON.stringify(songsData.data));
    }
  }, [songsData]);
};

export default useLoadSongs;

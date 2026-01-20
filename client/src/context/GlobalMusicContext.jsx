import { useState, useEffect, useRef } from "react";
import { createContext } from "react";

export const GlobalMusicContext = createContext(null);

export const GlobalMusicContextProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const audio = audioRef.current;

  const [currSong, setCurrSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const hasInitializedSong = useRef(false);

  useEffect(() => {
    if (!currSong) return;
    audio.src = currSong.url;
  }, [currSong]);

  const initCurrSongOnce = (song) => {
    if (hasInitializedSong.current) return;
    if (!song) return;

    setCurrSong(song);
    hasInitializedSong.current = true;
  };

  const togglePlay = () => {
    if (!currSong) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <GlobalMusicContext.Provider
      value={{
        currSong,
        setCurrSong,
        isPlaying,
        togglePlay,
        initCurrSongOnce,
      }}
    >
      {children}
    </GlobalMusicContext.Provider>
  );
};

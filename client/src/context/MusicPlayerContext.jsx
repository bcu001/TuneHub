import React, { createContext, useRef, useState, useEffect } from "react";

export const MusicPlayerContext = createContext(null);

export const MusicPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currSongList, setCurrSongList] = useState(null);
  const [currSong, setCurrSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [vol, setVol] = useState(100);
  const [currDuration, setCurrDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  // ✅ Corrected useEffect for updating `currDuration`
  useEffect(() => {
    const updateDuration = () => {
      setCurrDuration(audioRef.current.currentTime);
    };

    audioRef.current.addEventListener("timeupdate", updateDuration);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateDuration);
    };
  }, []); // ✅ Only runs once on mount

  // ✅ Updating `currentTime` when the user seeks the audio
  const updateCurrentDuration = (e) => {
    const currDur = e.target.value;
    audioRef.current.currentTime = currDur;
    setCurrDuration(currDur);
  };

  // ✅ Helper function for skipping songs
  const handleSkip = (direction) => {
    if (!currSongList || currSongList.length === 0) return;

    const currentIndex = currSongList.findIndex(
      (s) => s.songID === currSong.songID
    );
    const newIndex =
      (currentIndex + (direction === "prev" ? -1 : 1) + currSongList.length) %
      currSongList.length;

    setCurrSong(currSongList[newIndex]);
    setAudioSrc(currSongList[newIndex]);
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handleSkipBack = () => handleSkip("prev");
  const handleSkipForward = () => handleSkip("next");

  // ✅ Play/Pause Function
  const playPause = () => {
    if (currSong) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // ✅ Setting the audio source
  const setAudioSrc = (cs) => {
    console.log("Now Playing:", cs.songName);
    audioRef.current.src = cs.url;
    // console.log("location:", cs.location);

    // set total duration
    audioRef.current.addEventListener("loadedmetadata", () => {
      const totalDur = audioRef.current.duration;
      setTotalDuration(totalDur);
      // console.log("total duration", totalDur);
    });

    // set audio in loop until song is changed
    audioRef.current.loop = true;
  };

  // ✅ Handle Volume Change
  const handleVol = (e) => {
    const volume = e.target.value;
    setVol(volume);
    audioRef.current.volume = volume / 100;
  };

  // ✅ Debugging function
  const handletest = () => {
    console.log("duration", audioRef.current.duration);
    console.log("current duration", audioRef.current.currentTime);
  };

  const playSong = ()=>{
    if(isPlaying){
      audioRef.current.play();
    }
  }

  return (
    <MusicPlayerContext.Provider
      value={{
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
        isVisible,
        setIsVisible,
        playSong
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

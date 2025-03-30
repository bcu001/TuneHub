import React, { createContext, useState, useContext, useEffect, useRef } from "react";

// Create the context
export const MusicSystemContext = createContext(null);

// Music System Provider
export const MusicSystemProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [currentSongList, setCurrentSongList] = useState([]);
    const [currentDuration, setCurrentDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // Volume range (0-1)

    // Create an audio reference
    const audioRef = useRef(new Audio());

    // Play or Pause the audio
    const playPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Play previous song
    const playPreviousSong = () => {
        if (!currentSong || currentSongList.length === 0) return;
        const currentIndex = currentSongList.findIndex(song => song.id === currentSong.id);
        if (currentIndex > 0) {
            setCurrentSong(currentSongList[currentIndex - 1]);
        }
    };

    // Play next song
    const playNextSong = () => {
        if (!currentSong || currentSongList.length === 0) return;
        const currentIndex = currentSongList.findIndex(song => song.id === currentSong.id);
        if (currentIndex < currentSongList.length - 1) {
            setCurrentSong(currentSongList[currentIndex + 1]);
        }
    };

    // Update song duration based on time update
    useEffect(() => {
        const updateTime = () => {
            setCurrentDuration(audioRef.current.currentTime);
        };
        audioRef.current.addEventListener("timeupdate", updateTime);
        return () => {
            audioRef.current.removeEventListener("timeupdate", updateTime);
        };
    }, []);

    // Seek to new position
    const seek = (newTime) => {
        audioRef.current.currentTime = newTime;
        setCurrentDuration(newTime);
    };

    // Set volume
    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    return (
        <MusicSystemContext.Provider
            value={{
                currentSong,
                setCurrentSong,
                currentSongList,
                setCurrentSongList,
                playPreviousSong,
                playNextSong,
                playPause,
                isPlaying,
                currentDuration,
                seek,
                volume,
                setVolume,
            }}
        >
            {children}
        </MusicSystemContext.Provider>
    );
};

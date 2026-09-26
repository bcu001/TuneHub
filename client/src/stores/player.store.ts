import { audioService } from "@/services/player/audio.service";
import type { Song } from "@/types/song";
import { create } from "zustand";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume:number;

  playSong: (song: Song) => void;
  pause: () => void;
  resume: () => void;
  togglePlayPause: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume:(volume: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => {
  audioService.onTimeUpdate((time) => {
    set({
      currentTime: time,
    });
  });

  audioService.onDurationChange((duration) => {
    set({
      duration,
    });
  });

  audioService.onEnded(() => {
    set({
      isPlaying: false,
      currentTime: 0,
    });
  });

  return {
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,

    playSong: (song) => {
      audioService.play(song.audio.url);
      set({
        currentSong: song,
        isPlaying: true,
        currentTime: 0,
        duration: 0,
      });
    },

    pause: () => {
      audioService.pause();
      set({
        isPlaying: false,
      });
    },

    resume: () => {
      audioService.resume();
      set({
        isPlaying: true,
      });
    },

    togglePlayPause: () => {
      const { isPlaying, currentSong, pause, resume } = get();
      if (!currentSong) return;

      if (isPlaying) {
        pause();
      } else {
        resume();
      }
    },

    setCurrentTime: (time: number) => {
      audioService.seek(time);
      set({
        currentTime: time,
      });
    },
    setDuration: (duration: number) => {
      set({
        duration,
      });
    },
    setVolume: (volume: number)=>{
      audioService.setVolume(volume)
      set({
        volume,
      })
    }
  };
});

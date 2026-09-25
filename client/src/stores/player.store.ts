import type { Song } from "@/types/song";
import { create } from "zustand";
import { audioService } from "@/services/player/audio.service";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pause: () => void;
  resume: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentSong: null,
  isPlaying: false,

  playSong: (song) => {
    audioService.play(song.audio.url);
    set({
      currentSong: song,
      isPlaying: true,
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
}));

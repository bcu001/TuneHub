import { audioService } from '@/services/player/audio.service';
import type { Song } from '@/types/song';
import type { UnifiedSong } from '@/types/unifiedSong';
import { create } from 'zustand';

interface PlayerStore {
  // Keep the existing native player API intact.
  currentSong: Song | null;

  // Store unified metadata separately.
  currentUnifiedSong: UnifiedSong | null;

  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;

  playSong: (song: Song) => void;
  playExternalAudio: (song: UnifiedSong) => void;

  pause: () => void;
  resume: () => void;
  togglePlayPause: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => {
  audioService.onTimeUpdate((time) => {
    set({ currentTime: time });
  });

  audioService.onDurationChange((duration) => {
    set({ duration });
  });

  audioService.onEnded(() => {
    set({
      isPlaying: false,
      currentTime: 0,
    });
  });

  return {
    currentSong: null,
    currentUnifiedSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,

    // Existing native playback.
    playSong: (song) => {
      audioService.play(song.audio.url)?.catch((err: unknown) => {
        console.error('Audio playback error:', err);
      });

      set({
        currentSong: song,
        currentUnifiedSong: null,
        isPlaying: true,
        currentTime: 0,
        duration: 0,
      });
    },

    // Unified playback.
    playExternalAudio: (song) => {
      const audioUrl =
        song.source === 'native' ? song.audioUrl : song.previewUrl;

      if (!audioUrl || !song.isPlayable) return;

      audioService.play(audioUrl)?.catch((err: unknown) => {
        console.error('Audio playback error:', err);
      });

      set({
        currentSong: null,
        currentUnifiedSong: song,
        isPlaying: true,
        currentTime: 0,
        duration: 0,
      });
    },

    pause: () => {
      audioService.pause();
      set({ isPlaying: false });
    },

    resume: () => {
      audioService.resume()?.catch((err: unknown) => {
        console.error('Audio resume error:', err);
      });
      set({ isPlaying: true });
    },

    togglePlayPause: () => {
      const { isPlaying, currentSong, currentUnifiedSong, pause, resume } =
        get();

      if (!currentSong && !currentUnifiedSong) return;

      if (isPlaying) {
        pause();
      } else {
        resume();
      }
    },

    setCurrentTime: (time) => {
      audioService.seek(time);
      set({ currentTime: time });
    },

    setDuration: (duration) => {
      set({ duration });
    },

    setVolume: (volume) => {
      audioService.setVolume(volume);
      set({ volume });
    },
  };
});

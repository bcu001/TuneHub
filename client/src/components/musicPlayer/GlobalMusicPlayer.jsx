import { GlobalMusicContext } from "@/context/GlobalMusicContext";
import { Music, Play, Pause } from "lucide-react";
import { useContext } from "react";

export default function BottomMediaPlayer() {
  const { currSong, isPlaying, togglePlay } = useContext(GlobalMusicContext);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-surface-dark border-t border-zinc-800 flex items-center justify-between px-4 text-text-main-dark">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
          <Music size={20} className="text-zinc-300" />
        </div>

        <div className="leading-tight">
          <p className="text-sm font-medium truncate max-w-45">
            {currSong?.songName || "Unknown Song"}
          </p>
          <p className="text-xs text-zinc-400 truncate max-w-45">
            {currSong?.artist || "Unknown Artist"}
          </p>
        </div>
      </div>

      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
    </div>
  );
}

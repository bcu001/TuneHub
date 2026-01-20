import { assets } from "@/assets/assets";
import Loading from "@/components/common/Loading/Loading";
import { ENV } from "@/config/env";
import { GlobalMusicContext } from "@/context/GlobalMusicContext";
import useFetch from "@/hooks/useFetch";
import { Pause } from "lucide-react";
import { Play, Heart, Share2, MessageSquare, Download } from "lucide-react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export default function Song() {
  const { currSong, setCurrSong, isPlaying, togglePlay } =
    useContext(GlobalMusicContext);
  const { id } = useParams();
  const {
    data: song,
    error,
    loading,
  } = useFetch(`${ENV.serverUrl}/api/v2/songs/${id}`);

  useEffect(() => {
    setCurrSong(song);
  }, [song]);
  //   console.log(song);

  const date = new Date(song.releaseDate);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-3xl">{error}</p>;

  return (
    <div className="relative w-full min-h-95 overflow-hidden rounded-xl">
      <div className="relative flex gap-6 p-6 text-white">
        <img
          src={assets.defaultMusic}
          alt={song?.songName || "Unknown Song"}
          className="h-48 w-48 rounded-lg object-cover shadow-lg"
        />

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              {song?.songName || "Unknown Song"}
            </h1>

            <div className="mt-3 space-y-1 text-sm text-gray-200">
              <p>
                Artist: <span className="text-white">{song?.artist}</span>
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 rounded-md bg-cyan-400 px-5 py-2 text-sm font-semibold text-black hover:bg-cyan-300"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                Play
              </button>

              <button
                className={`flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm hover:bg-white/20 `}
              >
                <Heart size={18} />
                <span>{song.likes}</span>
              </button>
              <a
                href={song.url}
                download
                className="flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
              >
                <button>
                  <Download size={18} />
                </button>
              </a>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-300 ">
            <p>Category: {song.category || "Unknown category"}</p>
            <p>Year of Release: {date.getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

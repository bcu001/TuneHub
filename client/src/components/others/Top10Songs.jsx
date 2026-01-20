import React, { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import SongCardShowcase_v2 from "@/components/cards/SongCardShowcase_v2";
import { ENV } from "@/config/env.js";
import { useContext } from "react";
import { GlobalMusicContext } from "@/context/GlobalMusicContext";

const Top10Songs = () => {
  const { initCurrSongOnce } = useContext(GlobalMusicContext);
  // wait for tensongs to get data
  // setCurrSong with tenSongs.songs[0] if tenSongs got value
  // this function work only one time the entire app is open
  const {
    data: tenSongs,
    loading,
    error,
  } = useFetch(`${ENV.serverUrl}/api/v2/songs/top10`);

  useEffect(() => {
    if (tenSongs?.songs?.length) {
      initCurrSongOnce(tenSongs.songs[0]);
    }
  }, [tenSongs, initCurrSongOnce]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (tenSongs === null) return <p>No songs available</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white my-6 ">Trending Songs</h2>
      <div className="border border-gray-800">
        <div className="p-2 grid grid-cols-4">
          <div className="text-lg text-text-sec-dark">Rank</div>
          <div className="text-lg text-text-sec-dark">Title</div>
          <div className="text-lg text-text-sec-dark">Artist</div>
          <div className="text-lg text-text-sec-dark">Likes</div>
        </div>
        <div className="">
          {tenSongs.songs.map((song, idx) => (
            <SongCardShowcase_v2 key={song._id} song={song} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top10Songs;

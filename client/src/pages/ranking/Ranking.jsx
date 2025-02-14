import React, { useEffect, useState } from "react";
import axios from "axios";

import RankingCard from "@/components/cards/RankingCard";
import song from "@/database/song.json";

const Ranking = () => {
  const [rankedSong, setRankSong] = useState([]);
  useEffect(() => {
    handleRanking();
  }, []);

  const handleRanking = async () => {
    const res = await axios.get('http://localhost:3000/api/songs/getSongs');
    console.log(res.data);
    const sortedSongs = res.data.sort((a, b) => b.likes - a.likes);

    localStorage.setItem("lastSongList", JSON.stringify(sortedSongs));
    setRankSong(sortedSongs);
  };
  return (
    <div className="song-ranking-container p-5 bg-gray-100 rounded-md shadow-md overflow-auto h-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Top Song Rankings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rankedSong.map((song, i) => (
          <RankingCard song={song} index={i} key={i + 1} />
        ))}
      </div>
    </div>
  );
};

export default Ranking;

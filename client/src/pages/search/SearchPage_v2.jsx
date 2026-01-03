import SearchBar_v2 from "@/components/search/SearchBar_v2";
import SearchInput from "@/components/search/SearchInput";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import React from "react";
import { useEffect } from "react";
import { ENV } from "@/config/env";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import RecCard from "@/components/cards/RecCard";
import Card from "@/components/cards/Card";
import SongCard from "@/components/cards/SongCard";

const SearchPage_v2 = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!q) return;

    async function getSongs() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${ENV.serverUrl}/api/v2/songs/search?q=${q}&limit=10`
        );
        setSongs(res.data.songs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getSongs();
  }, [q]);

  return (
    <div className="text-text-main-dark space-y-3 bg-background-dark">
      <div className="mx-3">
        <SearchInput />
      </div>
      <div className="grid grid-cols-3 gap-3 mx-3">
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage_v2;

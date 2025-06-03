import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useLoadSongs from "@/hooks/useLoadSongs";
import MainPlayer from "@/components/musicPlayer/MainPlayer";
import { BASE_URL } from "@/global/baseurl";

const categories = [
  { category: "Pop", bgColor: "rgba(255, 105, 180, 0.3)" }, // Pink
  { category: "Rock", bgColor: "rgba(139, 0, 0, 0.3)" }, // Dark Red
  { category: "Hip Hop", bgColor: "rgba(255, 165, 0, 0.3)" }, // Orange
  { category: "Jazz", bgColor: "rgba(75, 0, 130, 0.3)" }, // Indigo
  { category: "Electronic", bgColor: "rgba(0, 191, 255, 0.3)" }, // Sky Blue
  { category: "Classical", bgColor: "rgba(255, 255, 224, 0.3)" }, // Light Yellow
  { category: "R&B", bgColor: "rgba(128, 0, 128, 0.3)" }, // Purple
  { category: "Country", bgColor: "rgba(210, 105, 30, 0.3)" }, // Chocolate Brown
  { category: "Reggae", bgColor: "rgba(34, 139, 34, 0.3)" }, // Green
  { category: "Folk", bgColor: "rgba(222, 184, 135, 0.3)" }, // Tan
];

const editURL = `${BASE_URL}/api/v1/songs`; // Backend API URL

export default function CategoryPage() {
  const { category } = useParams();
  const categoryData = categories.find((c) => c.category.toLowerCase() === category.toLowerCase());

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useLoadSongs(songs);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(`${editURL}/category`, { category });
        setSongs(response.data.data);
      } catch (err) {
        console.error("Error fetching songs:", err);
        setError("Failed to load songs. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (categoryData) {
      fetchSongs();
    } else {
      setLoading(false);
      setError("Category not found.");
    }
  }, [category]);

  if (!categoryData) {
    return (
      <div className="p-6 text-white text-center">
        <h1 className="text-4xl font-bold">Category Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      {/* Category Header */}
      <MainPlayer />
      <div
        className="rounded-md p-8 mb-6 text-center text-4xl font-bold"
        style={{ backgroundColor: categoryData.bgColor }}
      >
        {categoryData.category} Music
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <p>Loading songs...</p>
      ) : songs.length === 0 ? (
        <p>No songs found for this category.</p>
      ) : (
        <div className="backdrop-blur-2xl p-4 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Top {categoryData.category} Songs</h2>
          <ul className="list-disc list-inside">
            {songs.map((song) => (
              <li key={song.songID} className="mb-2">
                {song.songName} - {song.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

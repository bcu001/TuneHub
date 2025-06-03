import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/authContext";
import RecCard from "@/components/cards/RecCard";
import PlaylistCard from "@/components/cards/PlaylistCard";
import useLoadSongs from "@/hooks/useLoadSongs";
import MainPlayer from "@/components/musicPlayer/MainPlayer";
import { Plus } from "lucide-react"; // Assuming you're using lucide-react for icons
import { BASE_URL } from "@/global/baseurl";

const API_BASE_URL = `${BASE_URL}/api/v1/playlist`;
const SEARCH_API_URL = `${BASE_URL}/api/v1/search`; // Update this based on actual song API

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { currentUser } = useContext(AuthContext);
  useLoadSongs(songs);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getplaylists`, {
        userID: currentUser.userID,
      });
      setPlaylists(response.data.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const createPlaylist = async () => {
    if (!playlistName || selectedSongs.length === 0) {
      alert("Playlist name and at least one song are required.");
      return;
    }
    // console.log(playlistName, selectedSongs, currentUser.userID);

    try {
      const response = await axios.post(`${API_BASE_URL}/createplaylist`, {
        playlistName,
        songIDs: selectedSongs,
        userID: currentUser.userID,
      });
      alert(response.data.message);
      setPlaylistName("");
      setSelectedSongs([]);
      setIsCreating(false);
      fetchPlaylists();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const fetchPlaylistSongs = async (playlistID) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/getPlaylistSongs`, {
        playlistID,
      });
      setSongs(response.data.songs);
      setSelectedPlaylist(playlistID);
    } catch (error) {
      console.error("Error fetching playlist songs:", error);
    }
  };

  const searchSongs = async () => {
    if (!searchQuery) return;

    try {
      const response = await axios.post(SEARCH_API_URL + "/searchsongs", {
        query: searchQuery,
        category: "All", // Default to 'All' if no category filter is used
      });

      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error searching songs:", error);
    }
  };

  const selectSong = (songID) => {
    if (!selectedSongs.includes(songID)) {
      setSelectedSongs([...selectedSongs, songID]);
    }
  };

  return (
    <div className="w-full min-h-full text-white p-4">
      <MainPlayer />
      <h1 className="font-bold text-2xl">Playlist Manager</h1>

      {/* Playlist List */}
      <h2 className="font-bold text-xl my-4 ">Your Playlists</h2>
      <div className="flex flex-wrap gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            fetchPlaylistSongs={fetchPlaylistSongs}
          />
        ))}
        {isLoading && <div> Loading... </div>}
      </div>

      {/* Songs in Selected Playlist */}
      {selectedPlaylist && (
        <div className="mt-4">
          <h2 className="font-bold text-xl">Songs in Playlist</h2>
          <div className="space-y-3">
            {songs.map((song) => (
              <RecCard key={song.songID} song={song} />
            ))}
          </div>
        </div>
      )}

      {/* Create Playlist */}
      <div className="mt-6">
        <button
          onClick={() => setIsCreating(true)}
          className="p-4 bg-green-800 hover:bg-green-700 rounded-lg flex items-center gap-2"
        >
          <Plus size={24} /> Create Playlist
        </button>
      </div>

      {isCreating && (
        <div className="mt-4 p-4 bg-[#00000050] rounded-lg shadow-lg backdrop-blur-2xl">
          <h2 className="font-bold text-xl">Create New Playlist</h2>

          <input
            type="text"
            placeholder="Playlist Name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full p-2 my-2 border-b-2 outline-none  "
          />

          <input
            type="text"
            placeholder="Search Songs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 my-2 border-b-2 outline-none "
          />
          <button
            onClick={searchSongs}
            className="w-full bg-blue-600 p-2 my-2 rounded-md"
          >
            Search
          </button>

          {searchResults.length > 0 && (
            <div className="max-h-40 overflow-y-auto  p-2 rounded-md">
              <h3 className="font-bold text-lg">Search Results:</h3>
              <ul>
                {searchResults.map((song) => (
                  <li
                    key={song.songID}
                    className="p-2 border-b  cursor-pointer hover:bg-gray-700"
                    onClick={() => selectSong(song.songID)}
                  >
                    {song.songName} - {song.artist}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Selected Songs */}
          <div className="mt-2">
            <h3 className="font-bold text-lg">Selected Songs:</h3>
            <div className="flex flex-wrap gap-3">
              {selectedSongs.map((id, index) => (
                <div key={index} className="">
                  {id}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={createPlaylist}
            className={`w-full p-2 mt-2 rounded-md ${
              selectedSongs.length > 0
                ? "bg-green-600"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={selectedSongs.length === 0}
          >
            Create
          </button>

          <button
            onClick={() => setIsCreating(false)}
            className="w-full p-2 mt-2 bg-red-600 rounded-md"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Playlist;

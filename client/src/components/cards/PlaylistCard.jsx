import { assets } from "@/assets/assets";
import React from "react";

const PlaylistCard = ({ playlist, fetchPlaylistSongs }) => {
  return (
    <div
      key={playlist.id}
      className="p-2 border rounded w-[200px] overflow-hidden flex flex-col "
    >
      <img
        className="object-cover w-full h-[150px] rounded"
        src={assets.playlist}
        alt=""
      />
      <div className="p-2 truncate font-bold">{playlist.playlist_name}</div>
      <button
        onClick={() => fetchPlaylistSongs(playlist.id)}
        className="bg-green-500 p-1 cursor-pointer active:bg-green-600 rounded font-bold"
      >
        View Songs
      </button>
    </div>
  );
};

export default PlaylistCard;

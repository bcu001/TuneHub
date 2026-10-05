import api from "@/lib/axios";
import type { playlistSongs, playlistType } from "@/types/playlist";
import { toast } from "sonner";

export const getPlaylists = async (): Promise<{ playlists: playlistType[] }> => {
  const res = await api.get("/playlists");
  toast.success("get playlists for user", { duration: 500 });
  return res.data?.data;
};

export const getPlaylistById = async (id: string) => {
  const res = await api.get(`/playlists/${id}`);
  toast.success("get playlist by id", { duration: 500 });
  return res.data?.data;
};

export const addSongInPlaylist = async (id: string, songId: string) => {
  const res = await api.post(`/playlists/${id}/song/${songId}`);
  toast.success("song added in playlist", { duration: 500 });
  return res.data?.data;
};

export const removeSongFromPlaylist = async (id: string, songId: string) => {
  const res = await api.delete(`/playlists/${id}/song/${songId}`);
  toast.success("song removed from playlist", { duration: 500 });
  return res.data?.data;
};

export const createPlaylist = async (name: string, description: string) => {
  const res = await api.post("/playlists", { name, description });
  toast.success("playlist created", { duration: 500 });
  return res.data?.data;
};

export const getPlaylistSongs = async (
  id: string,
): Promise<playlistSongs[]> => {
  const res = await api.get(`/playlists/${id}/songs`);
  toast.success("playlist songs fetched", { duration: 500 });
  return res.data?.data.playlistSongs;
};

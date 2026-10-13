import api from '@/lib/axios';
import type {
  AddUnifiedSongPayload,
  Playlist,
  PlaylistResponse,
  PlaylistSong,
} from '@/types/playlist';
import { toast } from 'sonner';

export const getPlaylists = async (): Promise<PlaylistResponse> => {
  const res = await api.get('/playlists');
  return res.data?.data as PlaylistResponse;
};

export const getPublicPlaylists = async (
  limit: number,
  page: number
): Promise<PlaylistResponse> => {
  const res = await api.get(`/playlists/public?limit=${limit}&page=${page}`);
  return res.data?.data as PlaylistResponse;
};

export const getPlaylistById = async (
  id: string
): Promise<{ playlist: Playlist }> => {
  const res = await api.get(`/playlists/${id}`);
  return res.data?.data;
};

export const getPublicPlaylistById = async (
  id: string
): Promise<{ playlist: Playlist }> => {
  const res = await api.get(`/playlists/public/${id}`);
  return res.data?.data;
};

export const addSongInPlaylist = async (id: string, songId: string) => {
  const res = await api.post(`/playlists/${id}/song/${songId}`);
  toast.success('Song added to playlist', { duration: 1500 });
  return res.data?.data;
};

export const addUnifiedSongInPlaylist = async (
  playlistId: string,
  song: AddUnifiedSongPayload
) => {
  const res = await api.post(
    `/playlists/${playlistId}/unifiedsong/${song.songId}`, ///:id/unifiedsong/:songId
    song
  );

  return res.data?.data;
};

export const removeSongFromPlaylist = async (id: string, songId: string) => {
  const res = await api.delete(`/playlists/${id}/song/${songId}`);
  toast.success('Song removed from playlist', { duration: 1500 });
  return res.data?.data;
};

export const createPlaylist = async (name: string, description: string) => {
  const res = await api.post('/playlists', { name, description });
  toast.success('Playlist created', { duration: 1500 });
  return res.data?.data;
};

export const getPlaylistSongs = async (id: string): Promise<PlaylistSong[]> => {
  const res = await api.get(`/playlists/${id}/songs`);
  return res.data?.data.playlistSongs;
};

export const changePlaylistPrivacy = async (id: string): Promise<null> => {
  const res = await api.patch(`/playlists/${id}/change-privacy`);
  return res.data?.data;
};

export const getPublicPlaylistSongs = async (
  id: string
): Promise<PlaylistSong[]> => {
  const res = await api.get(`/playlists/public/${id}/songs`);
  return res.data?.data.playlistSongs;
};

export const removePlaylistEntry = async (
  playlistId: string,
  playlistSongId: string
) => {
  const res = await api.delete(
    `/playlists/${playlistId}/songs/${playlistSongId}`
  );

  return res.data?.data;
};

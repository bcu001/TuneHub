import { getApiErrorMessage } from "@/lib/utils";
import {
  getPlaylists as fetchPlaylists,
  getPlaylistById as fetchPlaylistById,
  addSongInPlaylist,
  removeSongFromPlaylist,
  createPlaylist as createPlaylistRequest,
  getPlaylistSongs,
} from "@/services/playlist/playlist.service";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

export default function usePlaylists(id?: string) {
  const queryClient = useQueryClient();

  // Queries
  const playlistsQuery = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  const playlistQuery = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => fetchPlaylistById(id!),
    enabled: !!id,
  });

  const playlistSongsQuery = useQuery({
    queryKey: ["playlistSongs", id],
    queryFn: () => getPlaylistSongs(id!),
    enabled: !!id,
  });

  // Invalidate all playlist-related queries
  const invalidatePlaylistQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ["playlists"],
    });

    queryClient.invalidateQueries({
      queryKey: ["playlist"],
    });

    queryClient.invalidateQueries({
      queryKey: ["playlistSongs"],
    });
  };

  // Create playlist
  const createPlaylistMutation = useMutation({
    mutationFn: ({
      name,
      description,
    }: {
      name: string;
      description: string;
    }) => createPlaylistRequest(name, description),

    onSuccess: () => {
      toast.success("Playlist created");
      invalidatePlaylistQueries();
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to create playlist"));
    },
  });

  // Add song
  const addSongMutation = useMutation({
    mutationFn: ({
      playlistId,
      songId,
    }: {
      playlistId: string;
      songId: string;
    }) => addSongInPlaylist(playlistId, songId),

    onSuccess: () => {
      toast.success("Song added to playlist");
      invalidatePlaylistQueries();
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to add song to playlist"));
    },
  });

  // Remove song
  const removeSongMutation = useMutation({
    mutationFn: ({
      playlistId,
      songId,
    }: {
      playlistId: string;
      songId: string;
    }) => removeSongFromPlaylist(playlistId, songId),

    onSuccess: () => {
      toast.success("Song removed from playlist");
      invalidatePlaylistQueries();
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to remove song from playlist"));
    },
  });

  return {
    playlistsQuery,
    playlistQuery,
    playlistSongsQuery,
    createPlaylistMutation,
    addSongMutation,
    removeSongMutation,
  };
}
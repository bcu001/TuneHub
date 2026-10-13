import { getApiErrorMessage } from '@/lib/utils';
import {
  getPlaylists as fetchPlaylists,
  getPlaylistById as fetchPlaylistById,
  addSongInPlaylist,
  removeSongFromPlaylist,
  createPlaylist as createPlaylistRequest,
  getPlaylistSongs,
  changePlaylistPrivacy,
  getPublicPlaylists,
  getPublicPlaylistById,
  getPublicPlaylistSongs,
} from '@/services/playlist/playlist.service';

import {
  // Keep your existing imports
  addUnifiedSongInPlaylist,
  removePlaylistEntry,
} from '@/services/playlist/playlist.service';

import type { AddUnifiedSongPayload } from '@/types/playlist';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

export default function usePlaylists(id?: string, isPublic = false) {
  const queryClient = useQueryClient();

  // Queries
  const playlistsQuery = useQuery({
    queryKey: ['playlists'],
    queryFn: fetchPlaylists,
  });

  const playlistQuery = useQuery({
    queryKey: ['playlist', id],
    queryFn: () => fetchPlaylistById(id!),
    enabled: !!id && !isPublic,
  });

  const playlistSongsQuery = useQuery({
    queryKey: ['playlistSongs', id],
    queryFn: () => getPlaylistSongs(id!),
    enabled: !!id && !isPublic,
  });

  const publicPlaylistSongsQuery = useQuery({
    queryKey: ['publicPlaylistSongs', id],
    queryFn: () => getPublicPlaylistSongs(id!),
    enabled: !!id && isPublic,
  });

  // Invalidate all playlist-related queries
  const invalidatePlaylistQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ['playlists'],
    });

    queryClient.invalidateQueries({
      queryKey: ['playlist'],
    });
    queryClient.invalidateQueries({
      queryKey: ['publicPlaylists'],
    });

    queryClient.invalidateQueries({
      queryKey: ['publicPlaylist'],
    });

    queryClient.invalidateQueries({
      queryKey: ['playlistSongs'],
    });

    queryClient.invalidateQueries({
      queryKey: ['publicPlaylistSongs'],
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
      toast.success('Playlist created');
      invalidatePlaylistQueries();
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to create playlist'));
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
      toast.success('Song added to playlist');
      invalidatePlaylistQueries();
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to add song to playlist'));
    },
  });

  // Add unified song
  const addUnifiedSongMutation = useMutation({
    mutationFn: ({
      playlistId,
      song,
    }: {
      playlistId: string;
      song: AddUnifiedSongPayload;
    }) => addUnifiedSongInPlaylist(playlistId, song),

    onSuccess: () => {
      toast.success('Song added to playlist');
      invalidatePlaylistQueries();
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to add song to playlist'));
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
      toast.success('Song removed from playlist');
      invalidatePlaylistQueries();
    },

    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, 'Failed to remove song from playlist')
      );
    },
  });

  // Change playlist privacy
  const changePlaylistPrivacyMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => changePlaylistPrivacy(id),
    onSuccess: () => {
      toast.success('Playlist privacy changed');
      invalidatePlaylistQueries();
    },
  });

  const removePlaylistEntryMutation = useMutation({
    mutationFn: ({
      playlistId,
      playlistSongId,
    }: {
      playlistId: string;
      playlistSongId: string;
    }) => removePlaylistEntry(playlistId, playlistSongId),

    onSuccess: () => {
      toast.success('Song removed from playlist');
      invalidatePlaylistQueries();
    },

    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, 'Failed to remove song from playlist')
      );
    },
  });

  // Get public playlists
  const publicPlaylistsQuery = useQuery({
    queryKey: ['publicPlaylists'],
    queryFn: () => getPublicPlaylists(10, 1),
  });

  // Get public playlists by id
  const publicPlaylistQuery = useQuery({
    queryKey: ['publicPlaylist', id],
    queryFn: () => getPublicPlaylistById(id!),
    enabled: !!id && isPublic,
  });

  return {
    playlistsQuery,
    playlistQuery,
    playlistSongsQuery,
    publicPlaylistSongsQuery,
    createPlaylistMutation,
    addSongMutation,
    addUnifiedSongMutation,
    removeSongMutation,
    changePlaylistPrivacyMutation,
    publicPlaylistsQuery,
    publicPlaylistQuery,
    removePlaylistEntryMutation,
  };
}

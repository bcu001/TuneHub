import { MoreVerticalIcon, Plus } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import usePlaylists from '@/hooks/usePlaylists';
import type { UnifiedSong } from '@/types/unifiedSong';

export default function UnifiedSongCardMoreOptions({
  song,
}: {
  song: UnifiedSong;
}) {
  const { playlistsQuery, createPlaylistMutation, addUnifiedSongMutation } =
    usePlaylists();

  const handleCreatePlaylist = async () => {
    try {
      const res = await createPlaylistMutation.mutateAsync({
        name: song.title,
        description: `${song.artist} - ${song.title}`,
      });

      const playlistId = res?.playlist?._id;

      if (!playlistId) {
        return;
      }

      await addUnifiedSongMutation.mutateAsync({
        playlistId,
        song: {
          provider: song.source,
          songId: song.id,
          title: song.title,
          artist: song.artist,
          imageUrl: song.artworkUrl!,
          duration: song.durationMs!,
          previewUrl: song.previewUrl ?? 'UNKOWN',
          audioUrl: song.audioUrl ?? 'UNKOWN',
        },
      });
    } catch (error) {
      // React Query mutations already display their own error toasts.
      console.error('Failed to create playlist or add song:', error);
    }
  };

  const handleAddSongToPlaylist = async (playlistId: string) => {
    try {
      await addUnifiedSongMutation.mutateAsync({
        playlistId,
        song: {
          provider: song.source,
          songId: song.id,
          title: song.title,
          artist: song.artist,
          imageUrl: song.artworkUrl!,
          duration: song.durationMs!,
          previewUrl: song.previewUrl ?? 'UNKOWN',
          audioUrl: song.audioUrl ?? 'UNKOWN',
        },
      });
    } catch (error) {
      console.error('Failed to add song to playlist:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <HugeiconsIcon icon={MoreVerticalIcon} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-45" align="end">
        <DropdownMenuLabel>More</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <HugeiconsIcon icon={Plus} size={14} strokeWidth={2} />
              <span>Add to Playlist</span>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={handleCreatePlaylist}
                  disabled={
                    createPlaylistMutation.isPending ||
                    addUnifiedSongMutation.isPending
                  }
                >
                  <HugeiconsIcon icon={Plus} size={14} strokeWidth={2} />
                  <span>New Playlist</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {playlistsQuery.data?.playlists.map((playlist) => (
                  <DropdownMenuItem
                    key={playlist._id}
                    onClick={() => handleAddSongToPlaylist(playlist._id)}
                    disabled={addUnifiedSongMutation.isPending}
                    className="cursor-pointer"
                  >
                    {playlist.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

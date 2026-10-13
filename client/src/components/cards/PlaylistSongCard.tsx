import { Play, MoreHorizontal, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
} from '../ui/dropdown-menu';
import type { PlaylistSong } from '@/types/playlist';
import usePlaylists from '@/hooks/usePlaylists';
import { usePlayerStore } from '@/stores/player.store';
import type { UnifiedSong } from '@/types/unifiedSong';

interface PlaylistSongCardProps {
  playlistSong: PlaylistSong;
  playlistId: string;
  canRemove?: boolean;
}

export default function PlaylistSongCard({
  playlistSong,
  playlistId,
}: PlaylistSongCardProps) {
  const { removePlaylistEntryMutation, removeSongMutation } =
    usePlaylists(playlistId);

  // const playSong = usePlayerStore((state) => state.playSong);
  const playExternalAudio = usePlayerStore((state) => state.playExternalAudio);

  const handlePlaySong = () => {
    const song = playlistSong.song;

    if (!song) return;

    const playableSong: UnifiedSong = {
      id: song.id,
      source: song.provider,
      title: song.title,
      artist: song.artist,
      artworkUrl: song.imageUrl || null,
      audioUrl: song.audioUrl || null,
      previewUrl: song.previewUrl || null,
      externalUrl: song.externalUrl ?? null,
      durationMs: song.duration || null,
      isPlayable: song.isPlayable,
    };

    playExternalAudio(playableSong);
  };

  const handleRemoveSong = () => {
    removePlaylistEntryMutation.mutate({
      playlistId,
      playlistSongId: playlistSong._id,
    });
  };

  return (
    <div className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60">
      {/* Number */}
      <div className="flex w-6 shrink-0 justify-center text-sm text-muted-foreground sm:w-8">
        <span className="group-hover:hidden">{playlistSong.position + 1}</span>

        <Play
          onClick={handlePlaySong}
          className="hidden size-4 fill-current group-hover:block cursor-pointer"
        />
      </div>

      {/* Song artwork */}
      <img
        src={playlistSong.song?.imageUrl}
        alt={playlistSong.song?.title}
        className="size-12 shrink-0 rounded-md object-cover"
      />

      {/* Song information */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {playlistSong.song?.title}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {playlistSong.song?.artist ?? 'Unknown artist'}
        </p>
      </div>

      {/* Position */}
      <span className="hidden w-16 text-center text-sm text-muted-foreground sm:block">
        {playlistSong.position + 1}
      </span>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 "
            disabled={removeSongMutation.isPending}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => handleRemoveSong()}
            disabled={removeSongMutation.isPending}
          >
            <Trash2 className="mr-1 size-4" />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

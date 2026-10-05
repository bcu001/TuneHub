import { Play, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
} from "../ui/dropdown-menu";
import type { playlistSongs } from "@/types/playlist";
import usePlaylists from "@/hooks/usePlaylists";
import { usePlayerStore } from "@/stores/player.store";

interface PlaylistSongCardProps {
  playlistSong: playlistSongs;
  playlistId: string;
}

export default function PlaylistSongCard({
  playlistSong,
  playlistId,
}: PlaylistSongCardProps) {
  const { removeSongMutation } = usePlaylists(playlistId);
  const playSong = usePlayerStore((state) => state.playSong);

  const handleRemoveSong = (songId: string) => {
    if (!playlistId) return;

    removeSongMutation.mutate({
      playlistId: playlistId,
      songId,
    });
  };

  return (
    <div className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60">
      {/* Number */}
      <div className="flex w-6 shrink-0 justify-center text-sm text-muted-foreground sm:w-8">
        <span className="group-hover:hidden">{playlistSong.position + 1}</span>

        <Play
          onClick={() => playSong(playlistSong.songId)}
          className="hidden size-4 fill-current group-hover:block cursor-pointer"
        />
      </div>

      {/* Song artwork */}
      <img
        src={playlistSong.songId.image?.url}
        alt={playlistSong.songId.title}
        className="size-12 shrink-0 rounded-md object-cover"
      />

      {/* Song information */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {playlistSong.songId.title}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {playlistSong.songId.artist ?? "Unknown artist"}
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
            onClick={() => handleRemoveSong(playlistSong.songId._id)}
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

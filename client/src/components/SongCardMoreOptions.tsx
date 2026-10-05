import { MoreVerticalIcon, Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "./ui/button";
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
} from "./ui/dropdown-menu";
import usePlaylists from "@/hooks/usePlaylists";
import type { Song } from "@/types/song";

export default function SongCardMoreOptions({ song }: { song: Song }) {
  const { playlistsQuery, createPlaylistMutation, addSongMutation } =
    usePlaylists();

  const handleCreatePlaylist = async () => {
    const res = await createPlaylistMutation.mutateAsync({
      name: song.title,
      description: song.description,
    });

    await addSongMutation.mutateAsync({
        playlistId: res?.playlist?._id,
        songId: song?._id,
    })
  };

  const handleAddSongToPlaylist = async (playlistId: string) => {
    await addSongMutation.mutateAsync({
      playlistId,
      songId: song?._id,
    });
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
                <DropdownMenuItem onClick={()=>handleCreatePlaylist()}>
                  <HugeiconsIcon icon={Plus} size={14} strokeWidth={2} />
                  <span>New Playlist</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {playlistsQuery?.data?.playlists.map((playlist) => (
                  <DropdownMenuItem
                    key={playlist._id}
                    onClick={() => handleAddSongToPlaylist(playlist._id)}
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

import { Link, useParams } from "react-router";
import { ArrowLeft, ListMusic, MoreHorizontal, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import usePlaylists from "@/hooks/usePlaylists";
import EmptyPlaylistSong from "@/components/EmptyPlaylistSong";
import PlaylistDetailsSkeleton from "@/components/skeletons/PlaylistDetailSKeleton";
import PlaylistSongCard from "@/components/cards/PlaylistSongCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDocumentTitle from "@/hooks/useDocumentTitle";

function PlaylistDetailPage() {
  useDocumentTitle("Playlist Details | TuneHub")
  const { id } = useParams<{ id: string }>();

  const { playlistQuery, playlistSongsQuery } = usePlaylists(id);

  const isLoading = playlistQuery.isLoading || playlistSongsQuery.isLoading;

  if (isLoading) {
    return <PlaylistDetailsSkeleton />;
  }

  if (playlistQuery.isError || playlistSongsQuery.isError) {
    return (
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex min-h-100 items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Unable to load playlist</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong while loading this playlist.
            </p>

            <Button
              className="mt-4"
              onClick={() => {
                playlistQuery.refetch();
                playlistSongsQuery.refetch();
              }}
            >
              Try again
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const playlist = playlistQuery.data;
  const songs = playlistSongsQuery.data ?? [];

  if (!playlist) {
    return (
      <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex min-h-100 items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-semibold">Playlist not found</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              This playlist does not exist or has been removed.
            </p>

            <Button asChild className="mt-4">
              <Link to="/playlists">Back to playlists</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto">
      {/* Back */}
      <Button asChild variant="ghost" className="mb-6 -ml-2">
        <Link to="/playlists">
          <ArrowLeft className="mr-2 size-4" />
          Playlists
        </Link>
      </Button>

      {/* Playlist header */}
      <section className="flex flex-col gap-6 sm:flex-row sm:items-end">
        {/* Playlist artwork */}
        <div className="flex size-44 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 via-muted to-primary/10 shadow-sm sm:size-52">
          <ListMusic className="size-20 text-muted-foreground/60 sm:size-24" />
        </div>

        {/* Playlist information */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-muted-foreground">Playlist</p>

          <h1 className="mt-1 truncate text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {playlist.name}
          </h1>

          {playlist.description && (
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {playlist.description}
            </p>
          )}

          <p className="mt-4 text-sm text-muted-foreground">
            {songs.length} {songs.length === 1 ? "song" : "songs"}
          </p>
        </div>
      </section>

      {/* Playlist actions */}
      <div className="mt-7 flex items-center gap-3">
        <Button
          size="lg"
          className="rounded-full px-6"
          disabled={songs.length === 0}
        >
          <Play className="mr-2 size-4 fill-current" />
          Play
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <MoreHorizontal className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuLabel>More</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link to={"/search"}>Add New Song</Link>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                Delete Playlist
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="my-6" />

      {/* Songs */}
      {songs.length === 0 ? (
        <EmptyPlaylistSong />
      ) : (
        <section>
          {/* Desktop heading */}
          <div className="mb-2 hidden grid-cols-[40px_1fr_80px_40px] items-center gap-3 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:grid">
            <span>#</span>
            <span>Title</span>
            <span>Position</span>
            <span />
          </div>

          <div className="space-y-1">
            {songs.map((playlistSong) => (
              <PlaylistSongCard
                key={playlistSong._id}
                playlistSong={playlistSong}
                playlistId={id!}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default PlaylistDetailPage;

import EmptyPlaylist from "@/components/EmptyPlaylist";
import PlaylistCard from "@/components/cards/PlaylistCard";
import ApiErrorUI from "@/components/common/ApiError";
import PlaylistPageSkeleton from "@/components/skeletons/PlaylistPageSkeleton";
import { Button } from "@/components/ui/button";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import usePlaylists from "@/hooks/usePlaylists";
import { getApiErrorMessage } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Link } from "react-router";

function PlaylistPage() {
  useDocumentTitle("Playlists | TuneHub")
  const { playlistsQuery } = usePlaylists();

  if (playlistsQuery.isLoading) {
    return <PlaylistPageSkeleton />;
  }

  if (playlistsQuery.isError) {
    return (
      <ApiErrorUI
        message={getApiErrorMessage(
          playlistsQuery.error,
          "Unable to load playlists",
        )}
        onRetry={playlistsQuery.refetch}
      />
    );
  }

  const playlists = playlistsQuery.data?.playlists ?? [];

  return (
    <div className="container mx-auto">
      {/* Page header */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Your Playlists
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {playlists.length === 0
              ? "Create your first playlist"
              : `${playlists.length} ${
                  playlists.length === 1 ? "playlist" : "playlists"
                }`}
          </p>
        </div>
        <Button>
          <Link to="/playlists/create" className="flex items-center gap-2">
            <Plus className="size-4" />
            <span>Create playlist</span>
          </Link>
        </Button>
      </div>

      {/* Empty state */}
      {playlists.length === 0 ? (
        <EmptyPlaylist />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PlaylistPage;

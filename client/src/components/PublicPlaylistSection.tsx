import PlaylistCard from '@/components/cards/PlaylistCard';
import ApiErrorUI from '@/components/common/ApiError';
import PlaylistPageSkeleton from '@/components/skeletons/PlaylistPageSkeleton';
import usePlaylists from '@/hooks/usePlaylists';
import { getApiErrorMessage } from '@/lib/utils';

function PublicPlaylistSection() {
  const { publicPlaylistsQuery } = usePlaylists();

  if (publicPlaylistsQuery.isLoading) {
    return <PlaylistPageSkeleton />;
  }

  if (publicPlaylistsQuery.isError) {
    return (
      <ApiErrorUI
        message={getApiErrorMessage(
          publicPlaylistsQuery.error,
          'Unable to load public playlists'
        )}
        onRetry={publicPlaylistsQuery.refetch}
      />
    );
  }

  const publicPlaylists = publicPlaylistsQuery.data?.playlists ?? [];

  return (
    <>
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Public Playlists
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {publicPlaylists.length === 0
              ? 'No public playlists found'
              : `${publicPlaylists.length} ${
                  publicPlaylists.length === 1 ? 'playlist' : 'playlists'
                }`}
          </p>
        </div>
      </div>

      {/* Empty state */}
      {publicPlaylists.length === 0 || (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {publicPlaylists.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      )}
    </>
  );
}

export default PublicPlaylistSection;

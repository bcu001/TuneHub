import { ListMusic, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router';

export default function EmptyPlaylistSong() {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border border-dashed px-6 py-12 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-muted">
        <ListMusic className="size-7 text-muted-foreground" />
      </div>

      <h2 className="text-lg font-semibold">No songs yet</h2>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Add some songs to your playlist.
      </p>

      <Button className="mt-5" asChild>
        <Link to={'/search'}>
          <Plus className="mr-2 size-4" />
          Add songs
        </Link>
      </Button>
    </div>
  );
}

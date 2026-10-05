import { ListMusic, Plus } from "lucide-react";
import  { Button } from "./ui/button";

export default function EmptyPlaylist() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-muted">
        <ListMusic className="size-7 text-muted-foreground" />
      </div>

      <h2 className="text-lg font-semibold">No playlists yet</h2>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Create a playlist to organize your favorite songs.
      </p>

      <Button className="mt-5">
        <Plus className="mr-2 size-4" />
        Create playlist
      </Button>
    </div>
  );
}
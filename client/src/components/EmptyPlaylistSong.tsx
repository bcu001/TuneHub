import { ListMusic, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function EmptyPlaylist() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center rounded-md border border-dashed text-center py-4">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-muted">
        <ListMusic className="size-7 text-muted-foreground" />
      </div>

      <h2 className="text-lg font-semibold">No Songs yet</h2>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Add some songs to your playlist.
      </p>

      <Button className="mt-5">
        <Link to={"/search"} className="flex items-center gap-2">
          <Plus className="size-4" />
          <span>Add songs</span>
        </Link>
      </Button>
    </div>
  );
}

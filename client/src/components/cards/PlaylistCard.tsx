import  { Card } from "@/components/ui/card";
import { ListMusic, MoreHorizontal } from "lucide-react";
import  { Link } from "react-router";
import  { Button } from "@/components/ui/button";
import  { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PlaylistCard({
  playlist,
}: {
  playlist: {
    _id: string;
    name: string;
    description: string;
  };
}) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md pt-0">
      <Link to={`/playlists/${playlist._id}`}>
        {/* Playlist artwork */}
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <div className="flex size-full items-center justify-center bg-linear-to-br from-primary/20 via-muted to-primary/10">
            <ListMusic className="size-20 text-muted-foreground/60 transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>
      </Link>

      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div className="min-w-0">
          <CardTitle className="truncate text-base">{playlist.name}</CardTitle>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </CardHeader>

      <CardContent>
        {playlist.description ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {playlist.description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">No description</p>
        )}
      </CardContent>
    </Card>
  );
}

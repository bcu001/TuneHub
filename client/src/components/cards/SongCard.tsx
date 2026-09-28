import { HugeiconsIcon } from "@hugeicons/react";
import { HeartIcon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Song } from "@/types/song";
import { usePlayerStore } from "@/stores/player.store";
import { useLike } from "@/hooks/useLike";

interface SongCardProps {
  song: Song;
}

const SongCard = ({ song }: SongCardProps) => {
  const { liked, like, unlike, isMutating } = useLike(song._id);
  const playSong = usePlayerStore((state) => state.playSong);
  const imageUrl = song.image.url.replace(
    "/upload/",
    "/upload/c_fill,q_auto,f_auto/",
  );

  return (
    <Card className="group overflow-hidden bg-background shadow-sm transition hover:shadow-md py-0">
      <CardContent className=" p-0">
        {/* Artwork */}
        <div className="relative  bg-muted brder">
          <img
            src={imageUrl}
            alt={song?.title}
            className="h-full w-full object-cover group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Featured */}
          {song?.isFeatured && (
            <Badge className="absolute left-3 top-3">Featured</Badge>
          )}
        </div>

        {/* Information */}
        <div className="flex flex-col gap-2 p-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{song?.title}</h3>

            <p className="truncate text-sm text-muted-foreground">
              {song?.artist}
            </p>
          </div>

          <div className="flex shrink-0 items-center justify-between  gap-2">
            <div className="flex items-center  gap-2">
              <Button
                variant="secondary"
                size="icon"
                className=""
                aria-label={
                  liked
                    ? `Unlike ${song.title ?? "song"}`
                    : `Like ${song.title ?? "song"}`
                }
                disabled={isMutating}
                onClick={(e) => {
                  e.stopPropagation();
                  if (liked) {
                    unlike();
                  } else {
                    like();
                  }
                }}
              >
                <HugeiconsIcon
                  icon={HeartIcon}
                  size={17}
                  strokeWidth={1.8}
                  className={liked ? "fill-pink-500" : ""}
                />
              </Button>
              <span className="">{song.stat.likes ?? 0}</span>
            </div>
            <Button
              onClick={() => playSong(song)}
              variant="default"
              aria-label={`Play ${song.title ?? "song"}`}
            >
              <span>Play</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongCard;

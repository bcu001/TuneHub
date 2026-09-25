import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayIcon,
  MoreVerticalIcon,
  HeartIcon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Song } from "@/types/song";
import { usePlayerStore } from "@/stores/player.store";

interface SongCardProps {
  song: Song;
}

const SongCard = ({ song }: SongCardProps) => {
  const playSong = usePlayerStore(state=> state.playSong);
  // console.log(song);
  return (
    <Card className="group overflow-hidden bg-background shadow-sm transition hover:shadow-md py-0">
      <CardContent className=" p-0">
        {/* Artwork */}
        <div className="relative  bg-muted brder">
          <img
            src={song?.image.url}
            alt={song?.title}
            className="h-full w-full object-cover group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Featured */}
          {song?.isFeatured && (
            <Badge className="absolute left-3 top-3">
              Featured
            </Badge>
          )}

          {/* Play button */}
          <Button
            size="icon"
            className="absolute bottom-3 right-3 h-11 w-11 rounded-full opacity-0 shadow-lg transition-all group-hover:opacity-100"
            onClick={() => playSong(song)}
            aria-label={`Play ${song?.title}`}
          >
            <HugeiconsIcon
              icon={PlayIcon}
              size={20}
              strokeWidth={2}
            />
          </Button>
        </div>

        {/* Information */}
        <div className="flex items-start justify-between gap-2 p-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">
              {song?.title}
            </h3>

            <p className="truncate text-sm text-muted-foreground">
              {song?.artist}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              aria-label={`Like ${song?.title}`}
            >
              <HugeiconsIcon
                icon={HeartIcon}
                size={17}
                strokeWidth={1.8}
              />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              aria-label="More options"
            >
              <HugeiconsIcon
                icon={MoreVerticalIcon}
                size={17}
                strokeWidth={1.8}
              />
            </Button>
          </div>
        </div>
      </CardContent>
      
    </Card>
  );
};

export default SongCard;
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayIcon,
  MoreVerticalIcon,
  HeartIcon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { Song } from "@/types/song";

interface SongCardProps {
  song: Song | undefined;
}

const SongHorizontalCard = ({ song }: SongCardProps) => {
  return (
    <Card className="group overflow-hidden transition-colors hover:bg-muted/50">
      <CardContent className="flex items-center gap-3 p-3">
        {/* Artwork */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
          <img
            src={song?.image}
            alt={song?.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Play overlay */}
          <button
            type="button"
            // onClick={() => onPlay?.(song)}
            aria-label={`Play ${song?.title}`}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <HugeiconsIcon
              icon={PlayIcon}
              size={22}
              strokeWidth={2}
              className="text-white"
            />
          </button>
        </div>

        {/* Song information */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium">
              {song?.title}
            </h3>

            {song?.isFeatured && (
              <Badge
                variant="secondary"
                className="hidden shrink-0 sm:inline-flex"
              >
                Featured
              </Badge>
            )}
          </div>

          <p className="truncate text-sm text-muted-foreground">
            {song?.artist}
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label={`Like ${song?.title}`}
          >
            <HugeiconsIcon
              icon={HeartIcon}
              size={18}
              strokeWidth={1.8}
            />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="More options"
          >
            <HugeiconsIcon
              icon={MoreVerticalIcon}
              size={18}
              strokeWidth={1.8}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongHorizontalCard;
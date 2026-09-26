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
import { useSongLike } from "@/hooks/useSong";
import SongHorizontalCardSkeleton from "../skeletons/SongHorizontalCardSkeleton";
import { usePlayerStore } from "@/stores/player.store";

interface SongCardProps {
  song: Song | undefined;
}

const SongHorizontalCard = ({ song }: SongCardProps) => {
  if (song === undefined) {
    return <SongHorizontalCardSkeleton />;
  }
  return <SongHorizontalCardContent song={song} />;
};

interface SongHorizontalCardContentProps {
  song: Song;
}

const SongHorizontalCardContent = ({
  song,
}: SongHorizontalCardContentProps) => {
  const { mutateAsync: likeSong } = useSongLike(song._id);
  const playSong = usePlayerStore((state)=>state.playSong);

  return (
    <Card className="group w-full overflow-hidden transition-colors hover:bg-muted/50">
      <CardContent className="flex min-w-0 items-center gap-2 p-2 sm:gap-3 sm:p-3">
        {/* Artwork */}
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md sm:h-14 sm:w-14 md:h-16 md:w-16">
          <img
            src={song.image.url}
            alt={song.title ?? "Song artwork"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Play overlay */}
          <button
            onClick={()=>playSong(song)}
            type="button"
            aria-label={`Play ${song.title ?? "song"}`}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          >
            <HugeiconsIcon
              icon={PlayIcon}
              size={20}
              strokeWidth={2}
              className="text-white sm:size-5.5"
            />
          </button>
        </div>

        {/* Song information */}
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="min-w-0 truncate text-sm font-medium sm:text-base">
              {song.title ?? "Unknown song"}
            </h3>

            {song.isFeatured && (
              <Badge
                variant="secondary"
                className="hidden shrink-0 sm:inline-flex"
              >
                Featured
              </Badge>
            )}
          </div>

          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            {song.artist ?? "Unknown artist"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
              aria-label={`Like ${song.title ?? "song"}`}
              onClick={() => likeSong()}
            >
              <HugeiconsIcon
                icon={HeartIcon}
                size={17}
                strokeWidth={1.8}
              />
            </Button>

            <span className="hidden min-w-8 text-xs tabular-nums text-muted-foreground sm:inline-block">
              {song.stat.likes ?? 0}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9"
            aria-label="More options"
          >
            <HugeiconsIcon
              icon={MoreVerticalIcon}
              size={17}
              strokeWidth={1.8}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongHorizontalCard;
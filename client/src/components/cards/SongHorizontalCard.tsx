import { HugeiconsIcon } from "@hugeicons/react";
import { HeartIcon, PlayIcon, StarIcon } from "@hugeicons/core-free-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useLike } from "@/hooks/useLike";
import { usePlayerStore } from "@/stores/player.store";
import type { Song } from "@/types/song";
import SongHorizontalCardSkeleton from "../skeletons/SongHorizontalCardSkeleton";

interface SongCardProps {
  song: Song | undefined;
}

const SongHorizontalCard = ({ song }: SongCardProps) => {
  if (!song) {
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
  const { liked, like, unlike, isMutating } = useLike(song._id);
  const playSong = usePlayerStore((state) => state.playSong);

  const imageUrl = song.image.url.replace(
    "/upload/",
    "/upload/w_96,h_96,c_fill,q_auto,f_auto/",
  );

  const title = song.title ?? "Unknown Title";
  const artist = song.artist ?? "Unknown Artist";
  const likes = song.stat?.likes ?? 0;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (liked) {
      unlike();
    } else {
      like();
    }
  };

  const handlePlay = () => {
    playSong(song);
  };

  return (
    <Card className="group overflow-hidden transition-colors hover:bg-muted/40">
      <CardContent className="flex min-w-0 items-center gap-2 p-2.5 sm:gap-4 sm:p-4">
        {/* Artwork */}
        <div className="relative size-12 shrink-0 overflow-hidden rounded-md sm:size-16">
          <img
            src={imageUrl}
            alt={`${title} artwork`}
            className="size-full object-cover"
            loading="lazy"
          />

          {song.isFeatured && (
            <div className="absolute right-1 top-1">
              <Badge
                variant="secondary"
                className="size-5 rounded-full p-0 backdrop-blur-sm"
              >
                <HugeiconsIcon
                  icon={StarIcon}
                  size={12}
                  strokeWidth={1.8}
                  className="fill-amber-400 text-amber-400"
                />
              </Badge>
            </div>
          )}
        </div>

        {/* Song information */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <h3 className="truncate text-sm font-semibold">{title}</h3>

          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {artist}
          </p>
        </div>

        {/* Like */}
        <div className="flex shrink-0 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full sm:size-9"
            aria-label={liked ? `Unlike ${title}` : `Like ${title}`}
            disabled={isMutating}
            onClick={handleLike}
          >
            <HugeiconsIcon
              icon={HeartIcon}
              size={17}
              strokeWidth={1.8}
              className={
                liked ? "fill-pink-500 text-pink-500" : "text-muted-foreground"
              }
            />
          </Button>

          <span className="min-w-7 text-xs tabular-nums text-muted-foreground">
            {likes}
          </span>
        </div>

        {/* Play */}
        <Button
          size="icon"
          className="size-8 shrink-0 rounded-full sm:size-10"
          aria-label={`Play ${title}`}
          onClick={handlePlay}
        >
          <HugeiconsIcon icon={PlayIcon} size={15} strokeWidth={2} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SongHorizontalCard;

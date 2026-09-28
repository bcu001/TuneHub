import { HugeiconsIcon } from "@hugeicons/react";

import { HeartIcon } from "@hugeicons/core-free-icons";

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
  const { liked, like, unlike, isMutating } = useLike(song._id);
  const playSong = usePlayerStore((state) => state.playSong);
  // const isPlaying = usePlayerStore((state) => state.isPlaying);
  // const currentSong = usePlayerStore((state) => state.currentSong);

  const imageUrl = song.image.url.replace(
    "/upload/",
    "/upload/w_64,h_64,c_fill,q_auto,f_auto/",
  );

  return (
    <Card className="relative">
      <CardContent className="flex flex-col lg:flex-row lg:justify-between gap-2">
        <div className="flex gap-2">
          {/* Artwork */}
          <img
            src={imageUrl}
            alt={song.title ?? "Song artwork"}
            className="object-cover size-16 rounded "
          />

          {/* Song information */}
          <div className="min-w-0 ">
            <h3 className="font-bold truncate text-sm">
              {song.title ?? "Unknown Title"}
            </h3>
            <p className="truncate text-xs">
              {song.artist ?? "Unknown artist"}
            </p>
            {song.isFeatured && <Badge variant={"secondary"}>Featured</Badge>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex  items-center justify-between lg: gap-2">
          <div className="flex  items-center  gap-2">
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
      </CardContent>
    </Card>
  );
};

export default SongHorizontalCard;

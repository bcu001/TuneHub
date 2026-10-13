import { HugeiconsIcon } from '@hugeicons/react';
import { PlayIcon, MusicNote01Icon } from '@hugeicons/core-free-icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import type { UnifiedSong } from '@/types/unifiedSong';
import { usePlayerStore } from '@/stores/player.store';
import UnifiedSongCardMoreOptions from '../UnifiedSongCardMoreOptions';

interface UnifiedSongCardProps {
  song: UnifiedSong;
}

export function UnifiedSongCard({ song }: UnifiedSongCardProps) {
  const playExternalAudio = usePlayerStore((state) => state.playExternalAudio);
  const imageUrl = song.artworkUrl
    ? song.artworkUrl.replace(/\/\d+x\d+bb\.(jpg|png|webp)$/i, '/200x200bb.$1')
    : null;

  const title = song.title ?? 'Unknown Title';
  const artist = song.artist ?? 'Unknown Artist';

  const handlePlay = () => {
    playExternalAudio(song);
  };

  return (
    <Card className="group overflow-hidden transition-colors hover:bg-muted/40">
      <CardContent className="flex min-w-0 items-center gap-2 p-2.5 sm:gap-4 sm:p-4">
        {/* Artwork */}
        <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted sm:size-16">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${title} artwork`}
              className="size-full object-cover"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="grid size-full place-items-center text-muted-foreground">
              <HugeiconsIcon
                icon={MusicNote01Icon}
                size={22}
                strokeWidth={1.8}
              />
            </div>
          )}
        </div>

        {/* Song information */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <h3 className="truncate text-sm font-semibold">{title}</h3>

          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {artist}
          </p>

          <div className="mt-1.5">
            <Badge
              variant="secondary"
              className="px-1.5 py-0 text-[10px] font-normal"
            >
              {song.source === 'native' ? 'TuneHub' : 'iTunes'}
            </Badge>
          </div>
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
        <UnifiedSongCardMoreOptions song={song as UnifiedSong} />
      </CardContent>
    </Card>
  );
}

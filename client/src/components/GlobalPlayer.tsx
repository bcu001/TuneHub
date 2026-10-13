import {
  PauseIcon,
  PlayIcon,
  VolumeHighIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePlayerStore } from '@/stores/player.store';
import { formatTime } from '@/lib/formatTime';

const GlobalPlayer = () => {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const currentUnifiedSong = usePlayerStore(
    (state) => state.currentUnifiedSong
  );

  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlayPause = usePlayerStore((state) => state.togglePlayPause);

  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);

  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);

  // Resolve display information from whichever track is active.
  const title = currentSong?.title ?? currentUnifiedSong?.title ?? 'Title';
  const artist = currentSong?.artist ?? currentUnifiedSong?.artist ?? 'Artist';

  const artwork =
    currentSong?.image?.url ?? currentUnifiedSong?.artworkUrl ?? undefined;

  const hasCurrentTrack = Boolean(currentSong || currentUnifiedSong);

  return (
    <div
      className={`${
        hasCurrentTrack ? '' : 'hidden'
      } sticky inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-lg`}
    >
      {/* Progress bar */}
      <div className="absolute inset-x-0 top-0">
        <Slider
          value={[currentTime]}
          max={duration || 1}
          step={1}
          onValueChange={([value]) => setCurrentTime(value)}
          className="h-1 cursor-pointer **:data-[slot=slider-thumb]:hidden"
          disabled={!hasCurrentTrack || duration <= 0}
        />
      </div>

      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-3 px-4 pt-1 sm:h-20 sm:gap-4 sm:px-6">
        {/* Song information */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:flex-[1.2]">
          <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted sm:size-12">
            {artwork && (
              <img
                src={artwork}
                alt={`${title} artwork`}
                className="size-full object-cover"
              />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{title}</p>

            <p className="truncate text-xs text-muted-foreground">{artist}</p>

            {currentUnifiedSong && (
              <p className="truncate text-[10px] text-muted-foreground">
                {currentUnifiedSong.source === 'native'
                  ? 'TuneHub'
                  : 'iTunes preview'}
              </p>
            )}
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex flex-1 flex-col items-center justify-center gap-1">
          <Button
            onClick={togglePlayPause}
            size="icon"
            className="size-10 rounded-full"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            disabled={!hasCurrentTrack}
          >
            <HugeiconsIcon
              icon={isPlaying ? PauseIcon : PlayIcon}
              className="size-5"
            />
          </Button>

          <div className="hidden items-center gap-2 text-[10px] tabular-nums text-muted-foreground sm:flex">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume controls */}
        <div className="hidden flex-1 items-center justify-end gap-2 md:flex">
          <HugeiconsIcon
            icon={VolumeHighIcon}
            className="size-4 text-muted-foreground"
          />

          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={([value]) => setVolume(value / 100)}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalPlayer;

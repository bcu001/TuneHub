import {
  HeartIcon,
  MoreVerticalIcon,
  PauseIcon,
  PlayIcon,
  PreviousIcon,
  NextIcon,
  VolumeHighIcon,
  RepeatIcon,
  ShuffleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/player.store";
import { formatTime } from "@/lib/formatTime";

const GlobalPlayer = () => {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlayPause = usePlayerStore((state) => state.togglePlayPause);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const volume = usePlayerStore(state=>state.volume);
  const setVolume = usePlayerStore(state=>state.setVolume);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      {/* Progress bar */}
      <div className="absolute inset-x-0 top-0">
        <Slider
          value={[currentTime]}
          max={duration || 1}
          step={1}
          onValueChange={([value]) => {
            setCurrentTime(value);
          }}
          className="h-1 cursor-pointer **:data-[slot=slider-thumb]:hidden"
        />
      </div>

      <div className="mx-auto flex h-20 max-w-screen-2xl items-center gap-4 px-4 pt-1">
        {/* ───────────────── Song Info ───────────────── */}
        <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-[1.2]">
          {/* Album artwork */}
          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
            <img
              src={currentSong?.image.url}
              className="object-cover text-muted-foreground"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {currentSong?.title || "Title"}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {currentSong?.artist || "Artist"}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="hidden shrink-0 sm:inline-flex"
          >
            <HugeiconsIcon icon={HeartIcon} />
          </Button>
        </div>

        {/* ───────────────── Main Controls ───────────────── */}
        <div className="flex flex-1 flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <HugeiconsIcon icon={ShuffleIcon} />
            </Button>

            <Button variant="ghost" size="icon">
              <HugeiconsIcon icon={PreviousIcon} />
            </Button>

            <Button
              onClick={togglePlayPause}
              size="icon"
              className="size-10 rounded-full"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <HugeiconsIcon
                icon={isPlaying ? PauseIcon : PlayIcon}
                className="size-5"
              />
            </Button>

            <Button variant="ghost" size="icon">
              <HugeiconsIcon icon={NextIcon} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <HugeiconsIcon icon={RepeatIcon} />
            </Button>
          </div>

          {/* Time */}
          <div className="hidden items-center gap-2 text-[10px] text-muted-foreground sm:flex">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* ───────────────── Volume / More ───────────────── */}
        <div className="hidden flex-1 items-center justify-end gap-2 md:flex">
          <HugeiconsIcon
            icon={VolumeHighIcon}
            className="size-4 text-muted-foreground"
          />

          <Slider defaultValue={[volume * 100]} max={100} step={1} onValueChange={([value])=>setVolume(value/100)} className="w-24" />

          <Button variant="ghost" size="icon">
            <HugeiconsIcon icon={MoreVerticalIcon} />
          </Button>
        </div>

        {/* Mobile more button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <HugeiconsIcon icon={MoreVerticalIcon} />
        </Button>
      </div>
    </div>
  );
};

export default GlobalPlayer;

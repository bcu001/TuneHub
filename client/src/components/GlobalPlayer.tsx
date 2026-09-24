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
  MusicNoteIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/player.store";

const GlobalPlayer = () => {
  const currentSong = usePlayerStore((state)=>state.currentSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const foo:boolean = true;
  if(foo) return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <h1>{currentSong?.title} </h1>
      <div>isPlaying {isPlaying ? "true": 'false'}</div>
    </div>
  )

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      {/* Progress bar */}
      <div className="absolute inset-x-0 top-0">
        <Slider
          defaultValue={[35]}
          max={100}
          step={1}
          className="h-1 cursor-pointer **:data-[slot=slider-thumb]:hidden"
        />
      </div>

      <div className="mx-auto flex h-20 max-w-screen-2xl items-center gap-4 px-4 pt-1">
        {/* ───────────────── Song Info ───────────────── */}
        <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-[1.2]">
          {/* Album artwork */}
          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
            <HugeiconsIcon
              icon={MusicNoteIcon}
              className="size-5 text-muted-foreground"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              Currently Playing Song
            </p>

            <p className="truncate text-xs text-muted-foreground">
              Artist Name
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
            <span>1:24</span>
            <span>/</span>
            <span>3:42</span>
          </div>
        </div>

        {/* ───────────────── Volume / More ───────────────── */}
        <div className="hidden flex-1 items-center justify-end gap-2 md:flex">
          <HugeiconsIcon
            icon={VolumeHighIcon}
            className="size-4 text-muted-foreground"
          />

          <Slider defaultValue={[70]} max={100} step={1} className="w-24" />

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

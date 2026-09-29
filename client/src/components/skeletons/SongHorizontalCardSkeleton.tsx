import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SongHorizontalCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-2.5 sm:p-4">
        {/* ================= MOBILE ================= */}
        <div className="flex gap-2 sm:hidden">
          {/* Artwork */}
          <Skeleton className="size-12 shrink-0 rounded-md" />

          {/* Song info */}
          <div className="min-w-0 flex-1 space-y-1">
            <Skeleton className="h-3.5 w-full max-w-20" />
            <Skeleton className="h-3 w-full max-w-15" />
          </div>

          {/* Actions */}
          <div className="flex shrink-0 flex-col items-center justify-between">
            {/* Like */}
            <Skeleton className="size-6 rounded-full" />

            {/* Play */}
            <Skeleton className="size-7 rounded-full" />
          </div>
        </div>

        {/* ================= TABLET / DESKTOP ================= */}
        <div className="hidden items-center gap-4 sm:flex">
          {/* Artwork */}
          <Skeleton className="size-16 shrink-0 rounded-md" />

          {/* Song info */}
          <div className="min-w-0 flex-1 space-y-1.5">
            <Skeleton className="h-4 w-40 max-w-full" />
            <Skeleton className="h-3.5 w-28 max-w-full" />
          </div>

          {/* Like */}
          <div className="flex shrink-0 items-center gap-1">
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="h-3 w-7" />
          </div>

          {/* Play */}
          <Skeleton className="size-10 shrink-0 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SongHorizontalCardSkeleton;

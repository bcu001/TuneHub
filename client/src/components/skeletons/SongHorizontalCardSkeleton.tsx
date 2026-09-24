import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SongHorizontalCardSkeleton = () => {
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="flex min-w-0 items-center gap-2 p-2 sm:gap-3 sm:p-3">
        {/* Artwork */}
        <Skeleton className="h-12 w-12 shrink-0 rounded-md sm:h-14 sm:w-14 md:h-16 md:w-16" />

        {/* Song information */}
        <div className="min-w-0 flex-1 space-y-2">
          {/* Title */}
          <Skeleton className="h-4 w-3/4 sm:h-5 sm:w-2/3" />

          {/* Artist */}
          <Skeleton className="h-3 w-1/2 sm:h-4 sm:w-1/3" />
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center">
          {/* Like */}
          <Skeleton className="h-8 w-8 rounded-md sm:h-9 sm:w-9" />

          {/* More */}
          <Skeleton className="ml-1 h-8 w-8 rounded-md sm:h-9 sm:w-9" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SongHorizontalCardSkeleton;
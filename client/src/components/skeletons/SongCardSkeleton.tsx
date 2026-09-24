import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SongCardSkeleton = () => {
  return (
    <Card className="group overflow-hidden bg-background py-0 shadow-sm">
      <CardContent className="p-0">
        {/* Artwork */}
        <Skeleton className="aspect-square w-full rounded-none" />

        {/* Information */}
        <div className="flex items-start justify-between gap-2 p-3">
          <div className="min-w-0 flex-1 space-y-2">
            {/* Title */}
            <Skeleton className="h-5 w-3/4" />

            {/* Artist */}
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongCardSkeleton;
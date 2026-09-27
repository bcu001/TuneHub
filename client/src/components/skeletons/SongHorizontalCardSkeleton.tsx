import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SongHorizontalCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 lg:flex-row lg:justify-between">
        {/* Artwork + song information */}
        <div className="flex gap-2">
          <Skeleton className="size-16 rounded" />

          <div className="min-w-0">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-1 h-3 w-24" />
            <Skeleton className="mt-1 h-5 w-16" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center">
            <Skeleton className="size-9 rounded-md" />
            <Skeleton className="ml-1 h-4 w-6" />
          </div>

          <Skeleton className="size-9 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SongHorizontalCardSkeleton;
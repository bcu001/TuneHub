import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlaylistDetailsSkeleton() {
  return (
    <main className="container mx-auto">
      <Skeleton className="mb-6 h-9 w-28" />

      {/* Header */}
      <section className="flex flex-col gap-6 sm:flex-row sm:items-end">
        <Skeleton className="size-44 shrink-0 rounded-xl sm:size-52" />

        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-full max-w-xl" />
          <Skeleton className="h-4 w-20" />
        </div>
      </section>

      {/* Actions */}
      <div className="mt-7 flex gap-3">
        <Skeleton className="h-11 w-24 rounded-full" />
        <Skeleton className="size-11 rounded-full" />
      </div>

      <Separator className="my-6" />

      {/* Songs */}
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 px-2 py-2">
            <Skeleton className="size-6" />
            <Skeleton className="size-12 rounded-md" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>

            <Skeleton className="hidden h-4 w-8 sm:block" />
            <Skeleton className="size-8 rounded-full" />
          </div>
        ))}
      </div>
    </main>
  );
}
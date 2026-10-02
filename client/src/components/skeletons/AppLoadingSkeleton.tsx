import { Skeleton } from "@/components/ui/skeleton";

const AppLoadingScreen = () => {
  return (
    <div className="min-h-screen w-full">
      {/* Navbar */}
      <header className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-4">
          {/* Sidebar trigger */}
          <Skeleton className="size-10 rounded-md" />

          {/* TuneHub logo */}
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>

        <div className="ml-auto flex items-center gap-4">
          {/* Login / Register or Avatar */}
          <Skeleton className="h-9 w-16 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="size-9 rounded-md" />
        </div>
      </header>

      {/* Homepage */}
      <main className="mt-4 w-full min-w-0 space-y-2 px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <Skeleton className="absolute inset-0 size-full rounded-2xl" />

          <div className="absolute inset-4">
            <Skeleton className="h-8 w-2/3 max-w-md rounded-md md:h-10 lg:h-12" />

            <Skeleton className="mt-3 h-4 w-4/5 max-w-2xl rounded-md md:h-5" />

            <Skeleton className="mt-2 h-4 w-3/5 max-w-xl rounded-md md:h-5" />
          </div>
        </section>

        {/* Categories */}
        <section className="mt-8">
          <div className="mb-5">
            <Skeleton className="h-8 w-52 rounded-md" />
            <Skeleton className="mt-2 h-4 w-64 rounded-md" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Skeleton className="h-9 w-16 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-9 w-16 rounded-full" />
          </div>
        </section>

        {/* Featured Songs */}
        <section className="mb-20 mt-8">
          <div className="mb-5">
            <Skeleton className="h-8 w-44 rounded-md" />
            <Skeleton className="mt-2 h-4 w-72 rounded-md" />
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-3 w-1/2 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AppLoadingScreen;
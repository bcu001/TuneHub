import SongHorizontalCard from "@/components/cards/SongHorizontalCard";
import ApiErrorUI from "@/components/common/ApiError";
import NoSearchResultUI from "@/components/NoSearchResultUI";
import SongHorizontalCardSkeleton from "@/components/skeletons/SongHorizontalCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSong } from "@/hooks/useSong";
import { getApiErrorMessage } from "@/lib/utils";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { SongSort } from "@/types/song";
import { useSearchParams } from "react-router";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimationConfig } from "@/config/animateConfig";

interface Inputs {
  q: string;
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { register, control, reset } = useForm<Inputs>();

  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sort, setSort] = useState<SongSort>("newest");
  const categoryId = searchParams.get("categoryId") || undefined;

  const search = useWatch({
    control,
    name: "q",
  });

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search || "");
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset pagination when sorting changes
  const handleSortChange = (newSort: SongSort) => {
    setSort(newSort);
    setPage(1);
  };
  const { data, isError, error, refetch, isPending, isFetched, isSuccess } =
    useSong(page, searchQuery, sort, categoryId);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <div className="mb-20">
      {/* Search */}
      <form>
        <Input type="search" placeholder="search music..." {...register("q")} />

        <Button disabled className="hidden" type="submit">
          Submit
        </Button>
      </form>

      {/* Sorting */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          variant={sort === "newest" ? "default" : "secondary"}
          onClick={() => handleSortChange("newest")}
        >
          Newest
        </Button>

        <Button
          type="button"
          variant={sort === "popular" ? "default" : "secondary"}
          onClick={() => handleSortChange("popular")}
        >
          Popular
        </Button>

        <Button
          type="button"
          variant={sort === "mostLiked" ? "default" : "secondary"}
          onClick={() => handleSortChange("mostLiked")}
        >
          Most Liked
        </Button>

        <Button
          type="button"
          variant={sort === "title" ? "default" : "secondary"}
          onClick={() => handleSortChange("title")}
        >
          A–Z
        </Button>

        <Button
          type="button"
          variant={sort === "oldest" ? "default" : "secondary"}
          onClick={() => handleSortChange("oldest")}
        >
          Oldest
        </Button>
      </div>

      <section>
        <div className="mt-6">
          {/* Error */}
          {isError && (
            <ApiErrorUI
              message={getApiErrorMessage(error, "Unable to load songs")}
              onRetry={refetch}
            />
          )}

          {/* No results */}
          {isSuccess && data?.songs.length === 0 && (
            <NoSearchResultUI reset={reset} />
          )}

          {/* Songs */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 2xl:grid-cols-3">
            {isPending &&
              Array.from({ length: 20 }).map((_, idx) => (
                <SongHorizontalCardSkeleton key={idx} />
              ))}

            {isFetched &&
              data?.songs.map((song, i) => (
                <BlurFade
                  key={song._id}
                  delay={AnimationConfig.delay * (i + 1)}
                  offset={120}
                  direction="up"
                  inView={true}
                >
                  <SongHorizontalCard key={song._id} song={song} />
                </BlurFade>
              ))}
          </div>
        </div>

        {/* Pagination */}
        {isSuccess && data?.totalPages > 0 && (
          <div className="mb-10 mt-10 flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-full disabled:opacity-40"
            >
              Prev
            </Button>

            <span className="text-sm text-base-content/55">
              Page{" "}
              <span className="font-semibold text-base-content">{page}</span> of{" "}
              {data.totalPages}
            </span>

            <Button
              variant="secondary"
              disabled={page >= data.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-full disabled:opacity-40"
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;

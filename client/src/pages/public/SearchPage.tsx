import SongHorizontalCard from "@/components/cards/SongHorizontalCard";
import ApiErrorUI from "@/components/common/ApiError";
import { Input } from "@/components/ui/input";
import { useSong } from "@/hooks/useSong";
import { getApiErrorMessage } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import NoSearchResultUI from "@/components/NoSearchResultUI";
import { Button } from "@/components/ui/button";
import SongHorizontalCardSkeleton from "@/components/skeletons/SongHorizontalCardSkeleton";

interface Inputs {
  q: string;
}

const SearchPage = () => {
  const { register, control, reset } = useForm<Inputs>();
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const search = useWatch({
    control,
    name: "q",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isError, error, refetch, isPending, isFetched, isSuccess } =
    useSong(page, searchQuery);
  // console.log(data);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <div>
      <form>
        <Input
          type="search"
          placeholder="search music..."
          {...register("q", { required: true })}
        />
        <Button disabled className="hidden" type="submit">
          Submit
        </Button>
      </form>
      <section>
        <div className="mt-6">
          {isError && (
            <ApiErrorUI
              message={getApiErrorMessage(error, "Unable to load songs")}
              onRetry={refetch}
            />
          )}

          {/* songs */}
          {data?.songs.length === 0 && <NoSearchResultUI reset={reset} />}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3">
            {isPending &&
              Array.from({ length: 20 }).map((_, idx) => (
                <SongHorizontalCardSkeleton key={idx} />
              ))}
            {isFetched &&
              data?.songs.map((song) => (
                <SongHorizontalCard key={song._id} song={song} />
              ))}
          </div>
        </div>

        {/* pagination */}
        {isSuccess && (
          <div className="mt-10 flex items-center justify-center gap-4 mb-10">
            <Button
              variant={"secondary"}
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="btn btn-outline btn-sm rounded-full disabled:opacity-40"
            >
              Prev
            </Button>
            <span className="text-sm text-base-content/55">
              Page{" "}
              <span className="font-semibold text-base-content">{page}</span> of{" "}
              {data?.totalPages}
            </span>
            <Button
              variant={"secondary"}
              disabled={page >= data?.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="btn btn-outline btn-sm rounded-full disabled:opacity-40"
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

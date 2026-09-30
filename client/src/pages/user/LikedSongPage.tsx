import SongHorizontalCard from "@/components/cards/SongHorizontalCard";
import api from "@/lib/axios";
import type { LikeSongResponse } from "@/types/song";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SongHorizontalCardSkeleton from "@/components/skeletons/SongHorizontalCardSkeleton";

function LikedSongPage() {
  const [page, setPage] = useState<number>(1);

  const { data, isPending } = useQuery({
    queryKey: ["getLikedSongs", page],
    queryFn: async (): Promise<LikeSongResponse> => {
      const { data } = await api.get(`/likes?page=${page}`);
      return data?.data;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);
  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 2xl:grid-cols-3">
        {isPending &&
          Array.from({ length: 10 }).map((_, idx) => (
            <SongHorizontalCardSkeleton key={idx} />
          ))}
        {!isPending &&
          data?.songs.map((song) => (
            <SongHorizontalCard key={song?._id} song={song.songId} />
          ))}
      </div>
      {/* custom pagination */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <Button
          variant={"ghost"}
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="btn btn-outline btn-sm rounded-full disabled:opacity-40"
        >
          Prev
        </Button>
        <span className="text-sm text-base-content/55">
          Page <span className="font-semibold text-base-content">{page}</span>{" "}
          of {data?.totalPages}
        </span>
        <Button
          variant={"ghost"}
          disabled={page >= (data?.totalPages ?? 1)}
          onClick={() => setPage((prev) => prev + 1)}
          className="btn btn-outline btn-sm rounded-full disabled:opacity-40"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default LikedSongPage;

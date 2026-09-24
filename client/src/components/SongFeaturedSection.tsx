import { getApiErrorMessage } from "@/lib/utils";
import SongCard from "./cards/SongCard";
import ApiErrorUI from "./common/ApiError";
import { useFeaturedSongs } from "@/hooks/useSong";
import SongCardSkeleton from "./skeletons/SongCardSkeleton";

const SongFeaturedSection = () => {
  const {
    data: featuredSongsData,
    isFetched: isFeaturedSongsFetched,
    isError,
    error,
    refetch,
  } = useFeaturedSongs();
  return (
    <section className=" ">
      {/* Section Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight">
          Featured Songs
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Discover handpicked tracks worth listening to.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {isError && (
          <ApiErrorUI
            message={getApiErrorMessage(error, "Unable to load featured songs")}
            onRetry={refetch}
          />
        )}
        {!isFeaturedSongsFetched && Array.from({length:10}).map((_,index)=>(
          <SongCardSkeleton key={index}/>
        ))}
        {isFeaturedSongsFetched &&
          featuredSongsData?.songs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
      </div>
    </section>
  );
};

export default SongFeaturedSection;

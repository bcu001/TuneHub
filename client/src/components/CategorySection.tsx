import { useCategory } from "@/hooks/useCategory";
import { useState } from "react";
import CategoryCard from "./cards/CategoryCard";
import ApiErrorUI from "./common/ApiError";
import { getApiErrorMessage } from "@/lib/utils";
import CategoryCardSkeleton from "./skeletons/CategoryCardSkeleton";
import { Button } from "./ui/button";

const CategorySection = () => {
  const [page, setPage] = useState<number>(1);

  const {
    data: categoriesData,
    isSuccess,
    isError: categoriesError,
    error: categoriesErrorDetails,
    refetch: refetchCategories,
    isPending,
  } = useCategory(page);

  return (
    <section className="w-full px-4 py-6 sm:px-6 lg:px-8 mb-4">
      {/* Section Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight">
          Explore Categories
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Curated vibe for every mood
        </p>
      </div>
      <div>
        {categoriesError && (
          <ApiErrorUI
            message={getApiErrorMessage(
              categoriesErrorDetails,
              "Unable to load categories",
            )}
            onRetry={refetchCategories}
          />
        )}
        <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {isPending &&
            Array.from({ length: 6 }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          {isSuccess &&
            categoriesData?.categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
        </div>
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
          of {categoriesData?.totalPages}
        </span>
        <Button
          variant={"ghost"}
          disabled={page >= (categoriesData?.totalPages ?? 1)}
          onClick={() => setPage((prev) => prev + 1)}
          className="btn btn-outline btn-sm rounded-full disabled:opacity-40"
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default CategorySection;

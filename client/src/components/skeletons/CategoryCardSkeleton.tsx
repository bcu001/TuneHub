import { Skeleton } from "../ui/skeleton"

const CategoryCardSkeleton = () => {
  return (
    <div className="w-full overflow-hidden">
      <Skeleton className="aspect-square p-6">
      </Skeleton>
    </div>
  )
}

export default CategoryCardSkeleton

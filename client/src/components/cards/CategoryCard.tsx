import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types/category";

interface CategoryProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryProps) => {
  return (
    <Card className="group relative w-full overflow-hidden border-0">
      <CardContent className="relative aspect-square p-0">
        {/* Category Image */}
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category Name */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <h3 className="line-clamp-2 text-base font-semibold text-white sm:text-lg md:text-xl">
            {category.name}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
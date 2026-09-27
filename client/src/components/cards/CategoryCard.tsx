import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types/category";
import { Link } from "react-router";

interface CategoryProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryProps) => {
  const imageUrl = category.image.replace(
    "/upload/",
    "/upload/c_fill,q_auto,f_auto/",
  );
  return (
    <Card className="group relative w-full overflow-hidden border-0 p-0 cursor-pointer ">
      <Link to={`/search?categoryId=${category._id}`}>
        <CardContent className="relative aspect-square p-0">
          {/* Category Image */}
          <img
            src={imageUrl}
            alt={category.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </CardContent>
      </Link>
    </Card>
  );
};

export default CategoryCard;

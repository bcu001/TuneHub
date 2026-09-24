import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types/category";

interface CategoryProps {
  category: Category;
}

const CategoryCard = (props: CategoryProps) => {
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="flex aspect-square items-center justify-center p-6">
        <span className="text-lg md:text-xl lg:text-lg wrap-break-word font-semibold ">
          {props.category.name}
        </span>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
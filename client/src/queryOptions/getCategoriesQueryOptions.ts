import { getCategories } from "@/services/category/category.service";
import { queryOptions } from "@tanstack/react-query";


export default function getCategoriesQueryOptions(page:number){
    return queryOptions({
		queryKey:["getCategories",page],
		queryFn:()=>getCategories(page),
		staleTime: 30 * 60 * 1000
	})
}
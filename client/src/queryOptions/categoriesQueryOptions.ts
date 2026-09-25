import { getCategories, getCategoryById } from "@/services/category/category.service";
import { queryOptions } from "@tanstack/react-query";


export function getCategoriesQueryOptions(page:number){
    return queryOptions({
		queryKey:["getCategories",page],
		queryFn:()=>getCategories(page),
		staleTime: 30 * 60 * 1000
	})
}
export function getCategoryByIdQueryOptions(id:string){
    return queryOptions({
        queryKey:['getCategoryById', id],
        queryFn: ()=>getCategoryById(id),
        staleTime: 30 * 60 * 1000,
        enabled: !!id
    })
}

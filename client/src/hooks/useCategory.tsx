import { getCategoriesQueryOptions, getCategoryByIdQueryOptions } from "@/queryOptions/categoriesQueryOptions";
import { useQuery } from "@tanstack/react-query";


export function useCategory(page:number){
    return useQuery(getCategoriesQueryOptions(page));
}

export function useCategoryById(id:string){
    return useQuery(getCategoryByIdQueryOptions(id));
}
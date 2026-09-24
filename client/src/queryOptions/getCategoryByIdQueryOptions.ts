import { getCategoryById } from "@/services/category/category.service"
import { queryOptions } from "@tanstack/react-query"


export default function getCategoryByIdQueryOptions(id:string){
    return queryOptions({
        queryKey:['getCategoryById', id],
        queryFn: ()=>getCategoryById(id),
        staleTime: 30 * 60 * 1000,
        enabled: !!id
    })
}
import { getSongs } from "@/services/music/song.services";
import { queryOptions } from "@tanstack/react-query";


export default function getSongsQueryOptions(page:number, q:string){
    return queryOptions({
        queryKey:['getSongs', page, q],
        queryFn:()=>getSongs(page,q)
    })
}
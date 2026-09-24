import { getSongById } from "@/services/music/song.services";
import { queryOptions } from "@tanstack/react-query";

export default function getSongByIdQueryOptions(id:string){
    return queryOptions({
        queryKey:['getSongById',id],
        queryFn:()=>getSongById(id)
    })
}
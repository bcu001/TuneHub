import getFeaturedSongsQueryOptions from "@/queryOptions/getFeaturedSongsQueryOptions";
import getSongByIdQueryOptions from "@/queryOptions/getSongByIdQueryOptions";
import getSongsQueryOptions from "@/queryOptions/getSongsQueryOptions";
import { useQuery } from "@tanstack/react-query";


export function useSong(page:number, q:string){
    return useQuery(getSongsQueryOptions(page,q));
}

export function useSongById(id:string){
    return useQuery(getSongByIdQueryOptions(id));
}

export function useFeaturedSongs(){
    return useQuery(getFeaturedSongsQueryOptions());
}
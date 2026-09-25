import { getFeaturedSongs, getSongById, getSongs } from "@/services/music/song.services";
import { queryOptions } from "@tanstack/react-query";


export function getSongsQueryOptions(page:number, q:string){
    return queryOptions({
        queryKey:['getSongs', page, q],
        queryFn:()=>getSongs(page,q)
    })
}
export function getSongByIdQueryOptions(id:string){
    return queryOptions({
        queryKey:['getSongById',id],
        queryFn:()=>getSongById(id)
    })
}
export function getFeaturedSongsQueryOptions(){
    return queryOptions({
        queryKey:['getFeaturedSongs'],
        queryFn:()=>getFeaturedSongs(),
    })
}
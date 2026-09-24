import { getFeaturedSongs } from "@/services/music/song.services";
import { queryOptions } from "@tanstack/react-query";

export default function getFeaturedSongsQueryOptions(){
    return queryOptions({
        queryKey:['getFeaturedSongs'],
        queryFn:()=>getFeaturedSongs(),
    })
}
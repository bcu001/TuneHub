import { getFeaturedSongs, getSongById, getSongs } from "@/services/music/song.services";
import { queryOptions } from "@tanstack/react-query";
import type { SongSort } from "@/types/song";


export function getSongsQueryOptions(
  page: number,
  q: string,
  sort: SongSort = "newest",
  categoryId?: string,
  featured?: boolean
) {
  return queryOptions({
    queryKey: [
      "getSongs",
      page,
      q,
      sort,
      categoryId,
      featured,
    ],

    queryFn: () =>
      getSongs(
        page,
        q,
        sort,
        categoryId,
        featured
      ),
  });
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
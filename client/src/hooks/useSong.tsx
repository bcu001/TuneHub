import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likeSong, unLikeSong, uploadSong } from "@/services/music/song.services";
import { getSongsQueryOptions, getSongByIdQueryOptions, getFeaturedSongsQueryOptions } from "@/queryOptions/songsQueryOptions";

export function useSong(page:number, q:string){
    return useQuery(getSongsQueryOptions(page,q));
}

export function useSongById(id:string){
    return useQuery(getSongByIdQueryOptions(id));
}

export function useFeaturedSongs(){
    return useQuery(getFeaturedSongsQueryOptions());
}

export function useUploadSong(){
    return useMutation({
        mutationFn: uploadSong
    });
}

export function useSongLike(id:string){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ()=> likeSong(id),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey:["getSongs"]
            })
        }
    })
}

export function useSongUnlike(id:string){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ()=>unLikeSong(id),
        onSuccess: ()=> {
            queryClient.invalidateQueries({
                queryKey: ["getSongs"],
            });
        }
    })
}
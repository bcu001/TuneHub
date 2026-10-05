import type { Song } from "./song";


export interface playlistSongs{
    _id:string;
    playlistId:string;
    songId: Song,
    position:number;
    createdAt:string;
    updatedAt:string;
    __v:number;
} 

export interface playlistType{
    _id:string;
    name:string;
    description:string;
    userId:string;
    createdAt:string;
    updatedAt:string;
    __v:number;
}
import api from "@/lib/axios"
import { toast } from "sonner";


export const getPlaylists = async()=>{
    const res = await api.get("/");
    toast.success("get playlists for user",{duration: 500});
    return res.data?.data;
}

export const getPlaylistById = async(id:string)=>{
    const res = await api.get(`/${id}`);
    toast.success("get playlist by id",{duration: 500});
    return res.data?.data;
}

export const addSongInPlaylist = async(id:string,songId:string)=>{
    const res = await api.post(`/${id}/song/${songId}`);
    toast.success("song added in playlist",{duration: 500});
    return res.data?.data;
}

export const removeSongFromPlaylist = async(id:string,songId:string)=>{
    const res = await api.delete(`/${id}/song/${songId}`);
    toast.success("song removed from playlist",{duration: 500});
    return res.data?.data;
}

export const createPlaylist = async(name:string, desscription:string)=>{
    const res = await api.post("/",{name,desscription});
    toast.success("playlist created",{duration: 500});
    return res.data?.data;
}
import api from "@/lib/axios";
import type { FeaturedSongsData, Song, SongData } from "@/types/song";
import { toast } from "sonner";

export const getSongs = async (page: number, q: string): Promise<SongData> => {
  const res = await api.get(`/songs`, {
    params: { page, q },
  });
  toast.success("getSongs");
  return res.data?.data;
};

export const getSongById = async (id: string): Promise<Song> => {
  const res = await api.get(`/songs/${id}`);
  toast.success("getSongById");
  return res.data?.data;
};

export const getFeaturedSongs = async (): Promise<FeaturedSongsData> => {
  const res = await api.get(`/songs/featured`);
  toast.success("getFeaturedSongs");
  return res.data?.data;
};

export const uploadSong = async (formData: FormData): Promise<Song> => {
  const res = await api.post(`/songs`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  toast.success("song send to backend");
  return res.data?.data
};

export const likeSong = async(id:string):Promise<Song>=>{
  const res = await api.patch(`/songs/${id}/like`);
  toast.success("song liked");
  return res.data?.data;
}

export const unLikeSong = async(id:string):Promise<Song>=>{
  const res = await api.patch(`/songs/${id}/unlike`);
  toast.success("song unliked");
  return res.data?.data;
}

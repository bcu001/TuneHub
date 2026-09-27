import api from "@/lib/axios";
import { toast } from "sonner";

export const likeSong = async (songId: string) => {
  const { data } = await api.post(`/likes/${songId}`);
  toast.success("like song", {duration: 300});
  return data?.data;
};

export const unlikeSong = async (songId: string) => {
  const { data } = await api.delete(`/likes/${songId}`);
  toast.success("unlike song", {duration: 300});
  return data?.data;
};

export interface SongLikeStatus {
    liked:boolean;
}

export const getSongLikeStatus = async (songId: string):Promise<SongLikeStatus> => {
  const {data} = await api.get(`/likes/${songId}/status`);
  toast.success("getSongLikeStatus", {duration: 300});
  return data?.data;
};

export const getSongLikeCount = async (songId: string) => {
  const { data } = await api.get(`/likes/${songId}/count`);
  toast.success("getSongLikeCount", {duration: 300});
  return data?.data;
};
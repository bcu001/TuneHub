import api from '@/lib/axios';
import { toast } from 'sonner';

export const likeSong = async (songId: string) => {
  const { data } = await api.post(`/likes/${songId}`);
  toast.success('Song liked', { duration: 1500 });
  return data?.data;
};

export const unlikeSong = async (songId: string) => {
  const { data } = await api.delete(`/likes/${songId}`);
  toast.success('Song unliked', { duration: 1500 });
  return data?.data;
};

export interface SongLikeStatus {
  liked: boolean;
}

export const getSongLikeStatus = async (
  songId: string
): Promise<SongLikeStatus> => {
  const { data } = await api.get(`/likes/${songId}/status`);
  return data?.data;
};

export const getSongLikeCount = async (songId: string) => {
  const { data } = await api.get(`/likes/${songId}/count`);
  return data?.data;
};

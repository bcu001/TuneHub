import {
  likeSong,
  unlikeSong,
  getSongLikeStatus,
} from '@/services/like/like.service';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from './useAuth';

export function useLike(songId: string) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const isNativeId = Boolean(
    songId && !songId.startsWith('itunes:') && /^[0-9a-fA-F]{24}$/.test(songId)
  );

  const likeStatusQuery = useQuery({
    queryKey: ['songLikeStatus', songId],
    queryFn: () => getSongLikeStatus(songId),
    enabled: isNativeId && isAuthenticated,
  });

  const likeMutation = useMutation({
    mutationFn: () => likeSong(songId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['songLikeStatus', songId],
      });

      queryClient.invalidateQueries({
        queryKey: ['getSongs'],
      });

      queryClient.invalidateQueries({
        queryKey: ['getLikedSongs'],
      });

      queryClient.invalidateQueries({
        queryKey: ['getFeaturedSongs'],
      });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlikeSong(songId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['songLikeStatus', songId],
      });

      queryClient.invalidateQueries({
        queryKey: ['getSongs'],
      });

      queryClient.invalidateQueries({
        queryKey: ['getLikedSongs'],
      });

      queryClient.invalidateQueries({
        queryKey: ['getFeaturedSongs'],
      });
    },
  });

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to like songs');
      return;
    }
    if (!isNativeId) {
      toast.error('Only TuneHub songs can be liked');
      return;
    }
    likeMutation.mutate();
  };

  const handleUnlike = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to like songs');
      return;
    }
    if (!isNativeId) {
      return;
    }
    unlikeMutation.mutate();
  };

  return {
    liked: likeStatusQuery.data?.liked || false,

    isLoading: likeStatusQuery.isLoading,

    like: handleLike,
    unlike: handleUnlike,

    isLiking: likeMutation.isPending,
    isUnliking: unlikeMutation.isPending,

    isMutating: likeMutation.isPending || unlikeMutation.isPending,
  };
}

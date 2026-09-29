import {
  likeSong,
  unlikeSong,
  getSongLikeStatus,
} from "@/services/like/like.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "./useAuth";

export function useLike(songId: string) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const likeStatusQuery = useQuery({
    queryKey: ["songLikeStatus", songId],
    queryFn: () => getSongLikeStatus(songId),
    enabled: !!songId && isAuthenticated,
  });

  const likeMutation = useMutation({
    mutationFn: () => likeSong(songId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["songLikeStatus", songId],
      });

      queryClient.invalidateQueries({
        queryKey: ["getSongs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["getLikedSongs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["getFeaturedSongs"],
      });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlikeSong(songId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["songLikeStatus", songId],
      });

      queryClient.invalidateQueries({
        queryKey: ["getSongs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["getLikedSongs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["getFeaturedSongs"],
      });
    },
  });
  return {
    liked: likeStatusQuery.data?.liked || false,

    isLoading: likeStatusQuery.isLoading,

    like: likeMutation.mutate,
    unlike: unlikeMutation.mutate,

    isLiking: likeMutation.isPending,
    isUnliking: unlikeMutation.isPending,

    isMutating: likeMutation.isPending || unlikeMutation.isPending,
  };
}

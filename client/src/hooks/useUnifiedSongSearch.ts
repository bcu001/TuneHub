import { searchUnifiedSongs } from '@/services/search/search.service';
import { useQuery } from '@tanstack/react-query';

export function useUnifiedSongSearch(query: string) {
  const normalizedQuery = query.trim();

  return useQuery({
    queryKey: ['unified-song-search', normalizedQuery],
    queryFn: () => searchUnifiedSongs(normalizedQuery),
    enabled: normalizedQuery.length >= 2,
    staleTime: 60_000,
  });
}

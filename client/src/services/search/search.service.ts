import api from '@/lib/axios';
import type { UnifiedSearchResponse } from '@/types/unifiedSong';

export async function searchUnifiedSongs(
  query: string
): Promise<UnifiedSearchResponse> {
  const response = await api.get('/search/songs', {
    params: { q: query },
  });

  return response.data.data;
}

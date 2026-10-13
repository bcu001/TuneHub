import Song from '../models/song.model.js';
import { searchITunesSongs } from './itunes.service.js';
import { escapeRegex, normalizeNativeSong } from '../lib/song.js';

export async function searchSongs(query, limit = 20) {
  const safeQuery = escapeRegex(query.trim());

  const nativeSearch = Song.find({
    $or: [
      { title: { $regex: safeQuery, $options: 'i' } },
      { artist: { $regex: safeQuery, $options: 'i' } },
      { description: { $regex: safeQuery, $options: 'i' } },
    ],
  })
    .limit(limit)
    .lean();

  const [nativeResult, itunesResult] = await Promise.allSettled([
    nativeSearch,
    searchITunesSongs(query, limit),
  ]);

  const nativeSongs =
    nativeResult.status === 'fulfilled'
      ? nativeResult.value.map(normalizeNativeSong)
      : [];

  const itunesSongs =
    itunesResult.status === 'fulfilled' ? itunesResult.value : [];

  if (
    nativeResult.status === 'rejected' &&
    itunesResult.status === 'rejected'
  ) {
    throw new Error('All song search providers failed');
  }

  return {
    songs: [...nativeSongs, ...itunesSongs],
    sources: {
      native: nativeResult.status === 'fulfilled' ? 'success' : 'error',
      itunes: itunesResult.status === 'fulfilled' ? 'success' : 'error',
    },
  };
}

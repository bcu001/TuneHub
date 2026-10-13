const ITUNES_SEARCH_URL = 'https://itunes.apple.com/search';

export async function searchITunesSongs(query, limit = 20) {
  const params = new URLSearchParams({
    term: query,
    media: 'music',
    entity: 'song',
    country: 'IN',
    limit: String(Math.min(Math.max(limit, 1), 50)),
  });

  const response = await fetch(`${ITUNES_SEARCH_URL}?${params.toString()}`, {
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`iTunes API returned ${response.status}`);
  }

  const result = await response.json();

  return result.results.map((track) => ({
    id: `${track.trackId}`,
    source: 'itunes',
    title: track.trackName,
    artist: track.artistName,
    artworkUrl: track.artworkUrl100 ?? null,
    audioUrl: null,
    previewUrl: track.previewUrl ?? null,
    externalUrl: track.trackViewUrl ?? null,
    durationMs: track.trackTimeMillis ?? null,
    isPlayable: Boolean(track.previewUrl),
  }));
}

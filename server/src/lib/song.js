export function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function normalizeNativeSong(song) {
  return {
    id: song._id.toString(),
    source: 'native',
    title: song.title,
    artist: song.artist,
    artworkUrl: song.image?.url ?? null,
    audioUrl: song.audio?.url ?? null,
    previewUrl: null,
    externalUrl: null,
    durationMs: song.audio?.duration ? song.audio.duration * 1000 : null,
    isPlayable: Boolean(song.audio?.url),
  };
}

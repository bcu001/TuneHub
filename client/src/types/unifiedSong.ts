export type SongSource = 'native' | 'itunes';

export interface UnifiedSong {
  id: string;
  source: SongSource;
  title: string;
  artist: string;
  artworkUrl: string | null;
  audioUrl: string | null;
  previewUrl: string | null;
  externalUrl: string | null;
  durationMs: number | null;
  isPlayable: boolean;
}

export interface UnifiedSearchResponse {
  songs: UnifiedSong[];
  sources: {
    native: 'success' | 'error';
    itunes: 'success' | 'error';
  };
}

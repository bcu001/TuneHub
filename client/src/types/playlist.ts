export interface PlaylistResponse {
  playlists: Playlist[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface Playlist {
  _id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  image: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PlaylistSong {
  _id: string;
  playlistId: string;
  position: number;
  createdAt: string;
  updatedAt: string;

  song: {
    id: string;
    provider: 'native' | 'itunes';
    title: string;
    artist: string;
    imageUrl: string;
    duration: number;
    audioUrl: string;
    previewUrl: string;
    externalUrl?: string | null;
    isPlayable: boolean;
  } | null;
}

export interface AddUnifiedSongPayload {
  provider: 'native' | 'itunes';
  songId: string;
  title: string;
  artist: string;
  imageUrl?: string;
  duration?: number;
  audioUrl?: string;
  previewUrl?: string;
}

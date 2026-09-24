export interface Song {
  _id: string;
  title: string;
  artist: string;
  statId: string;
  categoryId: string;
  createdAt: string;
  audio: string;
  description: string;
  image: string;
  isFeatured: boolean;
  releaseDate: string;
  updatedAt: string;
  __v: number;
}

export interface SongData {
  currPage: number;
  limit: number;
  skip: number;
  songs: Song[];
  totalPages: number;
  totalSongs: number;
}

export interface FeaturedSongsData{
  songCount:number;
  limit:number;
  songs:Song[];
}


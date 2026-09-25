type audioMetadata = {
  displayName:string;
  publicId:string,
  url:string;
  format:string;
  duration:number;
}

type imageMetadata = {
  displayName:string;
  publicId:string;
  url:string;
}

type StatType = {
  likes:number;
}

export interface Song {
  _id: string;
  title: string;
  description: string;
  artist: string;
  stat: StatType;
  audio: audioMetadata;
  image: imageMetadata;
  categoryId: string;
  releaseDate: string;
  isFeatured: boolean;
  createdAt: string;
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

export interface SongForm {
  title: string;
  artist: string;
  description: string;
  categoryId: string;
  audio: FileList;
  image: FileList;
}

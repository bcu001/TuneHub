import mongoose from "mongoose";

const playlistSongSchema = new mongoose.Schema(
  {
    playlistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
      required: [true, "Playlist ID is required"],
    },
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: [true, "Song ID is required"],
    },
    position: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

playlistSongSchema.index(
  { playlistId: 1, songId: 1 },
  { unique: true }
);

playlistSongSchema.index({ playlistId: 1, position: 1 });

const PlaylistSong = mongoose.model("PlaylistSong", playlistSongSchema);

export default PlaylistSong;
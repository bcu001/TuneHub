import mongoose from 'mongoose';

const playlistSongSchema = new mongoose.Schema(
  {
    playlistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist',
      required: [true, 'Playlist ID is required'],
    },

    // Existing native song reference
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
      required: false,
    },

    // Identifies the source of the song
    provider: {
      type: String,
      enum: ['native', 'itunes'],
      default: 'native',
      required: true,
    },

    // Used for external providers such as iTunes
    externalSongId: {
      type: String,
      required: false,
    },

    position: {
      type: Number,
      required: true,
      min: 0,
    },
    songSnapshot: {
      title: {
        type: String,
        required: false,
      },
      artist: {
        type: String,
        required: false,
      },
      imageUrl: {
        type: String,
        default: '',
      },
      duration: {
        type: Number,
        default: 0,
      },
      previewUrl: { type: String, default: '' },
      audioUrl: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

// Native songs: prevent duplicate native songs per playlist
playlistSongSchema.index(
  { playlistId: 1, songId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      provider: 'native',
      songId: { $type: 'objectId' },
    },
  }
);

// iTunes songs: prevent duplicate external songs per playlist
playlistSongSchema.index(
  { playlistId: 1, provider: 1, externalSongId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      provider: 'itunes',
      externalSongId: { $type: 'string' },
    },
  }
);

// Playlist position index
playlistSongSchema.index({ playlistId: 1, position: 1 });

const PlaylistSong = mongoose.model('PlaylistSong', playlistSongSchema);

export default PlaylistSong;

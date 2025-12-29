import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    albumName: {
      type: String,
      required: [true, "Album name is required"],
      trim: true,
      maxlength: 150
    },

    artist: {
      type: String,
      required: [true, "Artist is required"]
    },

    releaseDate: {
      type: Date,
      required: [true, "Release date is required"]
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Album", albumSchema);

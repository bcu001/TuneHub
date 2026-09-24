import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    name: {
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

const Album = mongoose.model("Album", albumSchema);
export default Album;

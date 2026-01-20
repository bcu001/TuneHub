import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {
        songName: {
            type: String,
            required: [true, "Song name is required"],
            trim: true,
            maxlength: 150
        },

        artist: {
            type: String,
            required: [true, "Artist is required"]
        },

        writer: {
            type: String,
            default: null
        },

        likes:
        {
            type: Number,
            min: 0,
            default: 0,
        },
        url: {
            type: String,
            default: "https://res.cloudinary.com/dp7nw5npc/video/upload/v1768913100/chinese-lunar-new-year-465871_1_hwoikv.mp3",
        }
        ,

        releaseDate: {
            type: Date,
            required: [true, "Release date is required"]
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            enum: {
                values: [
                    "pop",
                    "rock",
                    "hiphop",
                    "classical",
                    "electronic",
                    "indie",
                    "other"
                ],
                message: "{VALUE} is not supported"
            }
        },

        albumID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album",
            default: null
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Song", songSchema);

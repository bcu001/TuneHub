import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Song name is required"],
            trim: true,
            maxlength: 150
        },
        description: {
            type: String,
            required: [true, 'Description is requried'],
            trim: true
        },
        artist: {
            type: String,
            required: [true, "Artist is required"]
        },
        statId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stat',
            required: true,
        },
        audio: {
            type: String,
            default: "https://res.cloudinary.com/dp7nw5npc/video/upload/v1768913100/chinese-lunar-new-year-465871_1_hwoikv.mp3",
        },
        image: {
            type: String,
            default: "https://res.cloudinary.com/dp7nw5npc/image/upload/v1790145125/rvklkibvz6c4r473t5ro.svg"
        },
        releaseDate: {
            type: Date,
            required: [true, "Release date is required"]
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category_id is required"],
        },
        isFeatured: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Song =  mongoose.model("Song", songSchema);
export default Song;

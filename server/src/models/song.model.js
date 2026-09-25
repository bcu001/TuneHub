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
        stat: {
            likes: {
                type: Number,
                default: 0
            }
        },
        audio: {
            displayName: {
                type: String,
                required: true
            },
            publicId: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
            format: {
                type: String,
            },
            duration: {
                type: Number,
            },
        },
        image: {
            displayName: {
                type: String,
                required: true
            },
            publicId: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
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
    { timestamps: true, }
);

const Song = mongoose.model("Song", songSchema);
export default Song;

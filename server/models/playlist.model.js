import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Playlist name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true,
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dp7nw5npc/image/upload/v1790145729/uosnw53fszqyda84do44.svg"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requried: [true, "user_id is requried"],
    },
    isPrivate: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;
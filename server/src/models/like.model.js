import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'user_id is requried']
    },
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        required: [true, 'song_id is requried']
    }
}, { timestamps: true });

likeSchema.index(
    { userId: 1, songId: 1 },
    { unique: true }
);

const Like = mongoose.model("Like", likeSchema);
export default Like;
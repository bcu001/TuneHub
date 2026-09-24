import mongoose from "mongoose";
import mongoose from "mongoose";

const albumSongSchema = new mongoose.Schema({
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        default: null
    },
    songId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }
},{timestamps:true});

const AlbumSong = mongoose.model("AlbumSong", albumSongSchema);
export default AlbumSong;
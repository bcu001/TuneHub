import mongoose from "mongoose";

const playlistSongSchema = new mongoose.Schema({
    playlistId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
        requried: [true, 'playlist id is required']
    },
    songId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Song",
        requried: [true, 'song id is required']
    },
},{timestamps:true})

const PlaylistSong = mongoose.model("PlaylistSong", playlistSongSchema);
export default playlistSongSchema;
import express from 'express'
import {
    getPlaylists,
    createPlaylist,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addSongInPlaylist,
    removeSongFromPlaylist,
    reorderSongsInPlaylist
} from "../../controllers/v3/playlist.controller.js"
import authorize from "../../middleware/auth.middleware.js"

const playlistRouter = express.Router();

playlistRouter.get("/", authorize, getPlaylists);
playlistRouter.post("/", authorize, createPlaylist);
playlistRouter.get("/:id", authorize, getPlaylistById);
playlistRouter.patch("/:id", authorize, updatePlaylist);
playlistRouter.delete("/:id", authorize, deletePlaylist);
playlistRouter.post("/:id/song/:songId", authorize, addSongInPlaylist);
playlistRouter.delete("/:id/song/:songId", authorize, removeSongFromPlaylist);
playlistRouter.patch("/:id/song/:songId/reorder", authorize, reorderSongsInPlaylist);

export default playlistRouter;
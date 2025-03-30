import express from "express";
import { createPlaylist, getPlaylists, getPlaylistSongs } from "../controllers/playlist.js";

const router = express.Router();

router.post("/createplaylist", createPlaylist);
router.post("/getplaylists", getPlaylists)
router.post("/getPlaylistSongs", getPlaylistSongs)

export default router;

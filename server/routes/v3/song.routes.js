import express from 'express'
import { deleteSong, getFeaturedSongs, getSongById, getSongs, playSong, streamSong, updateSong, uploadSong } from '../../controllers/v3/song.controller.js';

export const songsRoutes = express.Router();

songsRoutes.get("/" , getSongs);
songsRoutes.post("/", uploadSong);
songsRoutes.get("/featured",getFeaturedSongs)
songsRoutes.get("/:id", getSongById);
songsRoutes.patch("/:id", updateSong);
songsRoutes.delete("/:id", deleteSong);
songsRoutes.get("/:id/stream", streamSong);
songsRoutes.post("/:id/play", playSong);


export default songsRoutes;
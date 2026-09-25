import express from 'express'
import { deleteSong, getFeaturedSongs, getSongById, getSongs, likeSong, playSong, streamSong, unLikeSong, updateSong, uploadSong } from '../../controllers/v3/song.controller.js';
import { configureUploadFields } from '../../middleware/multer.middleware.js';

export const songsRoutes = express.Router();

songsRoutes.get("/", getSongs);
songsRoutes.post("/",configureUploadFields() , uploadSong);
songsRoutes.get("/featured", getFeaturedSongs)
songsRoutes.get("/:id", getSongById);
songsRoutes.patch("/:id", updateSong);
songsRoutes.delete("/:id", deleteSong);
songsRoutes.patch("/:id/like", likeSong);
songsRoutes.patch("/:id/unlike", unLikeSong);
songsRoutes.get("/:id/stream", streamSong);
songsRoutes.post("/:id/play", playSong);


export default songsRoutes;
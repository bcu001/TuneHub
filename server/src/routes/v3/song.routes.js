import express from 'express'
import { deleteSong, getFeaturedSongs, getSongById, getSongs, getSongsv2, likeSong, playSong, streamSong, unLikeSong, updateSong, uploadSong } from '../../controllers/v3/song.controller.js';
import { configureUploadFields } from '../../middleware/multer.middleware.js';
import authorizeAdmin from "../../middleware/admin.middleware.js"
import authorize from '../../middleware/auth.middleware.js';

export const songsRoutes = express.Router();

songsRoutes.get("/", getSongsv2);
songsRoutes.post("/",authorize, authorizeAdmin ,configureUploadFields() , uploadSong);
songsRoutes.get("/featured", getFeaturedSongs)
songsRoutes.get("/:id", getSongById);
songsRoutes.patch("/:id", updateSong);
songsRoutes.delete("/:id", deleteSong);
songsRoutes.patch("/:id/like",authorize, likeSong);
songsRoutes.patch("/:id/unlike", authorize, unLikeSong);
songsRoutes.get("/:id/stream", streamSong);
songsRoutes.post("/:id/play", playSong);


export default songsRoutes;
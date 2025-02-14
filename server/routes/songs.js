import express from "express";
import {getFeatureSongs, getSongs} from "../controllers/song.js";

const router = express.Router();

router.get("/featuredSongs", getFeatureSongs);
router.get("/getSongs", getSongs);

export default router;

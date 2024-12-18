import express from "express";
import {getFeatureSongs} from "../controllers/song.js";

const router = express.Router();

router.get("/featuredSongs", getFeatureSongs);

export default router;

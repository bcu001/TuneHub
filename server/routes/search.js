import express from "express";
import { searchSong } from "../controllers/search.js";

const router = express.Router();

router.post("/searchsongs", searchSong);

export default router;

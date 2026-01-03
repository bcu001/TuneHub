import express from 'express';
import { featuredSongs, getSongMedia, like, unlike, rankingList, getTop, getTop10, getSongsByCategory, search } from '../../controllers/v2/song.controller.js';

const router = express.Router();

router.get("/featuredSongs", featuredSongs);
router.post("/getSongMedia", getSongMedia);
router.post("/like", like)
router.post("/unlike", unlike)
router.get("/ranking", rankingList)
router.get("/search", search)

router.get("/top", getTop)
router.get("/top10", getTop10)

router.post("/:category", getSongsByCategory);

export default router;
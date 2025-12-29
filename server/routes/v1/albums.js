import express from "express";
import { getAlbum } from "../../controllers/v1/albums.js";

const router = express.Router();

router.get("/", getAlbum);

export default router;
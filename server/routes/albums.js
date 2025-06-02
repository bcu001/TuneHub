import express from "express";
import { getAlbum } from "../controllers/albums.js";

const router = express.Router();

router.get("/", getAlbum);

export default router;
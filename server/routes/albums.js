import express from "express";
import { getAblum } from "../controllers/albums.js";

const router = express.Router();

router.get("/", getAblum);

export default router;
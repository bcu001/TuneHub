import express from "express";
import { uploadImage, uploadSong } from "../controllers/upload.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Upload both audio and image
router.post(
  "/song",
  upload.fields([
    { name: "audio", maxCount: 1 },  // Audio file
    { name: "image", maxCount: 1 },  // Image file
  ]),
  uploadSong
);

export default router;

import express from "express"
import { uploadImage } from "../controllers/upload.js";

// middleware 
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/image", upload.single("profileImage"), uploadImage);

export default router;
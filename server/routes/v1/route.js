import express from "express";

import authRoutes from "./auth.js";
import userRoutes from "./users.js";
import searchRoutes from "./search.js";
import songRoutes from "./songs.js";
import albumRoutes from "./albums.js";
import playlistRoutes from "./playlist.js";
import contactRoutes from "./contact.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/search", searchRoutes);
router.use("/songs", songRoutes);
router.use("/albums", albumRoutes);
router.use("/playlists", playlistRoutes);
router.use("/contact", contactRoutes);

export default router;

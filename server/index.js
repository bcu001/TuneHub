import express from "express";
import dotenv from "dotenv"; // Fix: Correct dotenv import
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import searchRoutes from "./routes/search.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/songs.js";
import contactRoutes from "./routes/contact.js";
import albumRoutes from "./routes/albums.js"; // Fix: Corrected typo from "ablums" to "albums"
import playlistRoutes from "./routes/playlist.js";

// test
// import uploadRoutes from "./routes/upload.js";

dotenv.config(); // Fix: Correct dotenv configuration

const app = express();
const PORT = process.env.SERVER_PORT || 5000; // Fix: Set default port if not provided

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Fix: Uncommented to support form data
app.use(
  cors({
    origin: process.env.SERVER_LINK || "*", // Fix: Default to "*" if SERVER_LINK is undefined
  })
);
app.use(cookieParser());

// Routes
app.use("/api/v1/search", searchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/songs", songRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/v1/albums", albumRoutes); // Fix: Corrected typo
app.use("/api/v1/playlist", playlistRoutes);

// test
// app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to backend of TuneHub" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./connect.js";

// Routes
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/songs.js";
import searchRoutes from "./routes/search.js";
import contactRoutes from "./routes/contact.js";
import albumRoutes from "./routes/albums.js"

//test
import uploadRoutes from "./routes/upload.js";

configDotenv();

const app = express();
const PORT = process.env.SERVER_PORT;

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/ablums", albumRoutes);

//test
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send({ Message: "Welcome to backend of tunehub" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/users", async (req, res) => {
  console.log("finding user working");
  const q = "select * from users";
  db.query(q, (err, data) => {
    if (err) {
      console.log("user finding failed ");
      return res.status(500).json(err);
    }
    console.log(data);
    res.json(data);
  });
});

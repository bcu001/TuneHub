import express from "express";
import { configDotenv } from "dotenv";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/songs.js";
import searchRoutes from "./routes/search.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./connect.js";

configDotenv();

const app = express();
const PORT = process.env.SERVER_PORT;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/search", searchRoutes);

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

// app.get("/admins", async (req, res) => {
//   try {
//     const [rows] = await db.query("select * from admin");
//     res.json(rows);
//   } catch (err) {
//     console.error("Error executing query:", err.message);
//     res.status(500).send("Database query failed");
//   }
// });

// app.get("/login", async (req, res) => {
//   try {
//     const [rows] = await db.query("select * from users");
//     res.json(rows);
//   } catch (err) {
//     console.error("Error executing query:", err.message);
//     res.status(500).send("Database query failed");
//   }
// });

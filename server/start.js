import app from "./app.js";
import dotenv from "dotenv";
import connectToDatabase from "./database/mongodb.js";

dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;


app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDatabase();
});
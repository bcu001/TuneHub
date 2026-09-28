import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/cors.js";
import { apiVersion } from "./config/constant.js";
import v3Routes from "./routes/v3/routes.js";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import helmet from 'helmet';

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("tiny"));

app.use(helmet()); // what does this do? it helps in securing the backend

// Disable ETags so Express returns 200 OK instead of 304 Not Modified
app.disable('etag');

// Global header to prevent WebView/Browser caching on all API responses
// app.use('/api', (req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//   res.setHeader('Pragma', 'no-cache');
//   res.setHeader('Expires', '0');
//   next();
// });

app.use(`${apiVersion}`, v3Routes);

app.get("/", (req, res) => {
  res.json({ message: "Backend of tunehub" });
});

app.use(notFound);
app.use(errorHandler);

export default app;

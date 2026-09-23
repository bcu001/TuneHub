import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/cors.js";
import { apiVersion } from "./config/constant.js";
import v3Routes from "./routes/v3/routes.js";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use(`${apiVersion}`, v3Routes);

app.get("/", (req, res) => {
  res.json({message:"Backend of tunehub"});
});

app.use(notFound);
app.use(errorHandler);

export default app;

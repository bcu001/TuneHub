import express from "express";
import cors from "cors";
import corsOptions from "./config/cors.js";
import apiRouter from "./apiRouter.js";

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api", apiRouter)

app.use("/", (req, res) => {

    res.send("tunehub");
})

export default app;


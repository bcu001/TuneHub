import express from "express";
import cors from "cors";
import corsOptions from "./config/cors.js";
import apiRouter from "./apiRouter.js";
import fs from 'fs/promises'
import Song from './models/song.model.js'

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

// app.use("/bulk", async (req, res) => {
   
//     try {
//         const out = await fs.readFile("./test/dummyData.json");
//         const songList = await JSON.parse(out);
//         const docs = songList.map(item=>new Song(item))

//         await Song.bulkSave(docs);
//         // await Song.bulkSave(docs);

//         res.json(docs);
//     } catch (error) {
//         res.send(error.message);
//     }

// })

export default app;


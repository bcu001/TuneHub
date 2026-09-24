import { db } from "../connect.js";
import multer from "multer";
import path from "path";
import fs, { write } from "fs"


export const uploadImage = (req, res) => {
    console.log(req.file);
    // console.log(`Path: ${req.file.path} \n fileName: ${req.file.filename}`);

} 
export const uploadSong = (req, res) => {
    try {
        console.log("song upload query started");
        
        // image and audio of song
        const audioFileBuffer = req.files["audio"][0].buffer;
        const imageFileBuffer = req.files["image"][0].buffer;
        
        // other remaining info of song
        const { name, artist, writer, category, releaseDate } = req.body;

        // Insert song details into 'songs' table
        const insertSongQuery = "INSERT INTO songs (songName, artist, writer, releaseDate, category) VALUES (?, ?, ?, ?, ?)";
        db.query(insertSongQuery, [name, artist, writer, releaseDate, category], (err, results) => {
            if (err) return res.status(500).json(err);

            const lastInsertID = results.insertId;

            // Insert audio and image into 'songMedia' table
            const insertMediaQuery = "INSERT INTO songMedia (songID, audio, image) VALUES (?, ?, ?)";
            db.query(insertMediaQuery, [lastInsertID, audioFileBuffer, imageFileBuffer], (err, results) => {
                if (err) return res.status(500).json("Song not able to send");
                return res.status(200).json("Song has been inserted!");
            });
        });
        
        console.log("song upload query ended!");
    } catch (err) {
        console.error("Error uploading song:", err);
        res.status(500).json({ message: "Error uploading song", error: err });
    }
};


        // const b = audioFile.buffer;
        // const f = b.toString('base64');
        // const u = `data:audio/mp3;base64,${f}`;
        // res.status(200).json(
        //     {
        //         audioDataUrl: u
        //     }
        // )
        // console.log("buffer to file:", u);

        // console.log("Audio file:", audioFile);
        // console.log("Image file:", imageFile);

        // Handle the files, save to database, etc.

        // res.status(200).json({
        //     message: "Song uploaded successfully",
        //     audio: audioFile,
        //     image: imageFile,
        // });
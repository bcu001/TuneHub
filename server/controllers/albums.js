import { db } from "../connect.js";

// finding album list using by time
export const getAlbum = (req, res) => {

    const checkAlbumList = `SELECT * FROM albums ORDER BY releaseDate DESC LIMIT 20`

    db.query(checkAlbumList, (err, results) => {
        if (err) {
            console.error("Query Error:", err);
            return res.json({ success: false, message: "Database error" });
        }
        return res.json({ success: true, data: results });
    })
};

// adding album list 
export const addAlbum = (req, res) => {
    console.log("Add Album");

    const { albumName, artist, releaseDate } = req.body;

    const q = "INSERT INTO albums (albumName, artist, releaseDate) VALUES (?)"

}
// editing album list
// delete album list



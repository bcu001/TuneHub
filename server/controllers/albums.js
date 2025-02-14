import { db } from "../connect.js";


export const getAblum = (req, res) => {
    console.log("getAblums");

    const albumName = "Desi kalakaar";

    const q = "SELECT * FROM songs WHERE albumID = (SELECT albumID FROM albums WHERE albumName = ?)";

    db.query(q, albumName, (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data).status(200);
    })
};



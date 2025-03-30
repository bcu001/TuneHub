import { db } from "../connect.js";

// ✅ Create a Playlist
export const createPlaylist = (req, res) => {
    const { playlistName, songIDs, userID } = req.body;

    if (!playlistName || !songIDs || !userID) {
        return res.status(400).json({ error: "All fields are required (playlistName, songIDs, userID)" });
    }

    // Check if playlist already exists for the user
    const checkQuery = "SELECT * FROM playlists WHERE user_id = ? AND playlist_name = ?";
    db.query(checkQuery, [userID, playlistName], (err, existingPlaylist) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        if (existingPlaylist.length > 0) {
            return res.status(400).json({ error: "Playlist with this name already exists" });
        }

        // Insert new playlist
        const insertPlaylist = "INSERT INTO playlists (playlist_name, user_id) VALUES (?, ?)";
        db.query(insertPlaylist, [playlistName, userID], (err, result) => {
            if (err) {
                console.error("Query Error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            const playlistID = result.insertId;

            // Insert songs into playlist_songs table
            const insertSongs = "INSERT INTO playlist_songs (playlistID, songID) VALUES ?";
            const songValues = songIDs.map((songID) => [playlistID, songID]);

            db.query(insertSongs, [songValues], (err) => {
                if (err) {
                    console.error("Query Error:", err);
                    return res.status(500).json({ success: false, message: "Database error" });
                }
                res.status(201).json({ message: "Playlist created successfully", playlistID });
            });
        });
    });
};

// ✅ Get All Playlists for a User
export const getPlaylists = (req, res) => {
    const { userID } = req.body; // Use req.query instead of req.body for GET

    if (!userID) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const query = "SELECT id, playlist_name FROM playlists WHERE user_id = ?";
    db.query(query, [userID], (err, results) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        res.status(200).json({ success: true, data: results });
    });
};

// ✅ Get Songs in a Specific Playlist
export const getPlaylistSongs = (req, res) => {
    const { playlistID } = req.body; // Use req.query instead of req.body for GET

    if (!playlistID) {
        return res.status(400).json({ error: "Playlist ID is required" });
    }

    // Query to fetch songs from a specific playlist
    const query = `
       SELECT s.songID, s.songName, s.artist, s.genre, s.url 
            FROM playlist_songs ps
            JOIN songs s ON ps.songID = s.songID
            WHERE ps.playlistID = ?;
    `;

    db.query(query, [playlistID], (err, results) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ success: true, songs: results });
    });
};

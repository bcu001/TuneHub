import { db } from "../../database/sql.js";


export const getSongMedia = (req, res) => {
  console.log("GetSongMedia")
  const { songID } = req.body;
  // console.log(req.body);
  // console.log(songID);
  const q = "SELECT * FROM songMedia where songID = ?";

  db.query(q, [songID], (err, results) => {
    if (err) return res.status(500).json("Song Media not found");
    // console.log("Results:", results)
    res.json(results);
  })
}

// add likes to songs 
// there is a bug in this like fucntion when like happens and when increasing the likecount error occur likecount increament failed but like is already recorded - unsolved for now 

export const like = async (req, res) => {
  const { userID, songID } = req.body;

  // Check if the user already liked the song
  const checkQuery = "SELECT * FROM likes WHERE userID = ? AND songID = ?";

  db.query(checkQuery, [userID, songID], (err, results) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      // User has not liked the song, so insert a like
      const insertQuery = "INSERT INTO likes (userID, songID, created_at) VALUES (?, ?, NOW())";
      db.query(insertQuery, [userID, songID], (err) => {
        if (err) {
          console.error("Insert Error:", err);
          return res.json({ success: false, message: "Failed to like song" });
        }

        // Increment the like count in the songs table
        const updateQuery = "UPDATE songs SET likesCount = likesCount + 1 WHERE songID = ?";
        db.query(updateQuery, [songID], (err) => {
          if (err) {
            console.error("Update Error:", err);
            return res.json({ success: false, message: "Failed to update like count" });
          }

          return res.json({ success: true, message: "Liked successfully!" });
        });
      });
    } else {
      return res.json({ success: false, message: "Already liked!" });
    }
  });

}

// unlikes to songs

export const unlike = (req, res) => {
  const { userID, songID } = req.body;

  // Check if the like exists
  const checkQuery = "SELECT * FROM likes WHERE userID = ? AND songID = ?";

  db.query(checkQuery, [userID, songID], (err, results) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({ success: false, message: "Database error" });
    }

    if (results.length > 0) {
      // Unlike the song (delete like)
      const deleteQuery = "DELETE FROM likes WHERE userID = ? AND songID = ?";
      db.query(deleteQuery, [userID, songID], (err) => {
        if (err) {
          console.error("Delete Error:", err);
          return res.json({ success: false, message: "Failed to unlike song" });
        }

        // Decrement like count in songs table
        const updateQuery = "UPDATE songs SET likesCount = likesCount - 1 WHERE songID = ?";
        db.query(updateQuery, [songID], (err) => {
          if (err) {
            console.error("Update Error:", err);
            return res.json({ success: false, message: "Failed to update like count" });
          }

          return res.json({ success: true, message: "Unliked successfully!" });
        });
      });
    } else {
      return res.json({ success: false, message: "You haven't liked this song yet!" });
    }
  });
};

// checking current ranking based on likes
export const rankingList = (req, res) => {
  const checkRanking = `
  SELECT * FROM songs 
  ORDER BY likesCount DESC 
  LIMIT 50;

`

  db.query(checkRanking, (err, results) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({ success: false, message: "Database error" });
    }
    return res.json({ success: true, data: results });
  })
}

export const getFeatureSongs = (req, res) => {
  const q = "SELECT * FROM songs ORDER BY releaseDate DESC LIMIT 8";


  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // console.log(data);
      res.json(data); // Send the data as JSON to the frontend
    }
  });
};

export const featuredSongs = (req, res) => {
  const checkFeaturedSong = `SELECT * FROM songs ORDER BY releaseDate DESC LIMIT 4;`

  db.query(checkFeaturedSong, (err, results) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({ success: false, message: "Database error" });
    }

    return res.json({ success: true, data: results });
  })

}

export const getTop = (req, res) => {
  const checkTopsong = `SELECT * FROM songs ORDER BY likesCount DESC LIMIT 1;`

  db.query(checkTopsong, (err, results) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({ success: false, message: "Database error" });
    }
    return res.json({ success: true, data: results });
  });
};

export const getTop10 = (req, res) => {
  const checkTop10song = `SELECT * FROM songs ORDER BY COALESCE(likesCount, 0) DESC LIMIT 10;`;

  db.query(checkTop10song, (err, results) => {
    if (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    return res.status(200).json({ success: true, data: results });
  });
};

export const getSongsByCategory = (req, res) => {
  const { category } = req.body

  if (!category) {
      return res.status(400).json({ error: "Category is required" });
  }

  const query = `
      SELECT songID, songName, artist, writer, genre, url, likesCount
      FROM songs
      WHERE genre = ?
      ORDER BY likesCount DESC, songName ASC
      LIMIT 50;
  `;

  db.query(query, [category], (err, results) => {
      if (err) {
          console.error("Error fetching songs by category:", err);
          return res.status(500).json({ error: "Database error", message: err.message });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: "No songs found for this category." });
      }

      return res.status(200).json({ success: true, data: results });
  });
};

import { db } from "../connect.js";

export const searchSong = (req, res) => {
    const { query, category } = req.body;
    console.log("Query:", query, "Category:", category);

    if (!query) return res.status(400).json({ error: "Query is required" });

    // Base query including the URL column
    let q = `
        SELECT songID, songName, artist, writer, genre, url, MAX(likesCount) AS likesCount, MIN(priority) AS priority
        FROM (
            (SELECT songID, songName, artist, writer, genre, url, likesCount, 1 AS priority 
             FROM songs WHERE songName LIKE ? LIMIT 50)
            UNION ALL
            (SELECT songID, songName, artist, writer, genre, url, likesCount, 2 AS priority 
             FROM songs WHERE artist LIKE ? LIMIT 50)
            UNION ALL
            (SELECT songID, songName, artist, writer, genre, url, likesCount, 3 AS priority 
             FROM songs WHERE writer LIKE ? LIMIT 50)
        ) AS temp
    `;

    // Parameters for SQL query
    const searchTerm = `%${query}%`;
    let queryParams = [searchTerm, searchTerm, searchTerm];

    // If a category is selected (not "All"), apply genre filtering
    if (category && category !== "All") {
        q += ` WHERE genre = ?`;
        queryParams.push(category);
    }

    // Final query processing
    q += ` GROUP BY songID, songName, artist, writer, genre, url ORDER BY priority, songName LIMIT 50;`;

    db.query(q, queryParams, (err, results) => {
        if (err) return res.status(500).json(err.message);
        console.log("Results found:", results.length);
        return res.status(200).json({ success: true, data: results });
    });
};


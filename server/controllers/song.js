import { db } from "../connect.js";

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

export const getSongs = (req, res) => {
  const q = "SELECT * FROM songs";

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(data);
    }
  })

}
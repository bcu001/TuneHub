import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const songsFilePath = path.join(__dirname, "songs_list.txt"); // Input file
const outputSQLPath = path.join(__dirname, "insert_songs.sql"); // Output SQL file

const imageUrl = "https://cdn.pixabay.com/photo/2021/01/29/08/10/musician-5960112_1280.jpg";
const categories = ['Pop', 'Rock', 'Hip Hop', 'Jazz', 'Electronic', 'Classical', 'R&B', 'Country', 'Reggae', 'Folk', 'other'];
const artists = ['Artist A', 'Artist B', 'Artist C', 'Artist D', 'Artist E'];
const writers = ['Writer X', 'Writer Y', 'Writer Z', 'Writer M', 'Writer N'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomDate = () => {
    const start = new Date(1990, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

const generateInsertQuery = async () => {
    try {
        const data = await fs.readFile(songsFilePath, "utf-8");
        const songs = data.split("\n").filter(song => song.trim() !== "");
        
        const values = songs.map(song => {
            const s = song;
            const songName = song.replace(/\.mp3$/i, "").replace(/[_\-]/g, " ").trim();
            const location = `../songs/${s}`;
            const likes = Math.floor(Math.random() * 10000) + 1; // Random likes 1-10000
            const category = getRandomElement(categories);
            const artist = getRandomElement(artists);
            const writer = getRandomElement(writers);
            const releaseDate = getRandomDate();
            return `('${songName}', ${likes}, '${imageUrl}', '${artist}', '${writer}', '${releaseDate}', '${category}', '${location}')`;
        });
        
        const query = `INSERT INTO songs (songName, likes, songImage, artist, writer, releaseDate, category, location) VALUES\n` + values.join(",\n") + ";";
        
        await fs.writeFile(outputSQLPath, query, "utf-8");
        console.log("SQL insert query saved to:", outputSQLPath);
    } catch (error) {
        console.error("Error processing songs:", error);
    }
};

generateInsertQuery();

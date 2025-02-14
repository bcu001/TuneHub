import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const songsPath = path.join(__dirname, "songs");
const outputFilePath = path.join(__dirname, "songs_list.txt"); // Output file

const sc = async (url) => {
    try {
        const songs = await fs.readdir(url);

        // Join song names with newline for writing
        const songList = songs.join("\n");

        // Write to a new text file
        await fs.writeFile(outputFilePath, songList, "utf-8");

        console.log("Song list saved to:", outputFilePath);
    } catch (error) {
        console.error("Error reading/writing songs directory:", error);
    }
};

sc(songsPath);

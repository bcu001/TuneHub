import mongoose from "mongoose";
import Song from "../../models/song.model.js";
import Category from "../../models/category.model.js";
import Stat from "../../models/stat.model.js";
import ENV from "../../config/env.js";
import dns from 'dns'

const MONGO_URI = `${ENV.DB_URI}/${ENV.DB_NAME}`;

dns.setServers([
     "0.0.0.0",
    "8.8.8.8"
])

const categories = [
    "Pop",
    "Rock",
    "Hip Hop",
    "Electronic",
    "Jazz",
    "Classical",
    "Lo-Fi",
    "R&B",
    "Indie",
    "Ambient",
];

const artists = [
    "Nova",
    "Aria",
    "Eclipse",
    "Atlas",
    "Luna",
    "Echo",
    "Orion",
    "Vega",
    "Neon",
    "Aster",
];

const adjectives = [
    "Midnight",
    "Golden",
    "Silent",
    "Electric",
    "Fading",
    "Endless",
    "Crimson",
    "Lost",
    "Dreaming",
    "Hidden",
];

const nouns = [
    "Dreams",
    "Memories",
    "Lights",
    "Hearts",
    "Skies",
    "Echoes",
    "Waves",
    "Stories",
    "Shadows",
    "Stars",
];

const randomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const randomDate = () => {
    const start = new Date("2020-01-01").getTime();
    const end = new Date("2026-09-01").getTime();

    return new Date(start + Math.random() * (end - start));
};

const seedSongs = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("MongoDB connected");

        // Clear existing data
        await Song.deleteMany({});
        await Stat.deleteMany({});
        await Category.deleteMany({});

        // Create categories
        const categoryDocs = await Category.insertMany(
            categories.map((name) => ({
                name,
            }))
        );

        // Create stats
        const statDocs = await Stat.insertMany(
            Array.from({ length: 200 }, () => ({
                playCount: Math.floor(Math.random() * 10000),
                likeCount: Math.floor(Math.random() * 2000),
            }))
        );

        // Create songs
        const songs = Array.from({ length: 200 }, (_, index) => {
            const category = randomItem(categoryDocs);
            const artist = randomItem(artists);

            return {
                title: `${randomItem(adjectives)} ${randomItem(nouns)} ${index + 1}`,

                description: `A ${category.name} song by ${artist}.`,

                artist,

                statId: statDocs[index]._id,

                releaseDate: randomDate(),

                categoryId: category._id,

                isFeatured: index < 20,
            };
        });

        const songDocs = await Song.insertMany(songs);

        console.log(`Created ${songDocs.length} songs`);
        console.log(`Created ${categoryDocs.length} categories`);
        console.log(`Created ${statDocs.length} stats`);

        await mongoose.disconnect();

        console.log("Seed completed");
    } catch (error) {
        console.error("Seed failed:", error);

        await mongoose.disconnect();

        process.exit(1);
    }
};

seedSongs();
import mongoose from "mongoose";
import Song from "../../models/song.model.js";
import Category from "../../models/category.model.js";
import Stat from "../../models/stat.model.js";
import ENV from "../../config/env.js";
import dns from 'dns'
import {categories, artists,adjectives,nouns } from "../mockData/data.js";

const MONGO_URI = `${ENV.DB_URI}/${ENV.DB_NAME}`;
const MAX_SONGS = 300;

dns.setServers([
     "0.0.0.0",
    "8.8.8.8"
])

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
        console.log("Old Songs are deleted");

        // Create categories
        const categoryDocs = await Category.insertMany(
            categories.map((category) => ({
                name: category.name,
                slug: category.slug,
                description: category.description,
                image:
                    "https://res.cloudinary.com/dp7nw5npc/image/upload/v1790145125/rvklkibvz6c4r473t5ro.svg",
            }))
        );

        // Create stats
        const statDocs = await Stat.insertMany(
            Array.from({ length: MAX_SONGS }, () => ({
                playCount: Math.floor(Math.random() * 10000),
                likeCount: Math.floor(Math.random() * 2000),
            }))
        );

        // Create songs
        const songs = Array.from({ length: MAX_SONGS }, (_, index) => {
            const category = randomItem(categoryDocs);
            const artist = randomItem(artists);

            return {
                title: `${randomItem(adjectives)} ${randomItem(nouns)} ${index + 1}`,

                description: `A ${category.name} song by ${artist}.`,
                artist,
                statId: statDocs[index]._id,
                releaseDate: randomDate(),
                categoryId: category._id,
                isFeatured: index < 30,
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
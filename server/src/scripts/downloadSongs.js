import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.JAMENDO_CLIENT_ID;

if (!CLIENT_ID) {
  throw new Error("JAMENDO_CLIENT_ID is missing from .env");
}

const SONGS_PER_GENRE = 10;

const AUDIO_DIR = path.resolve("public/audio");
const COVER_DIR = path.resolve("public/covers");
const SEED_DIR = path.resolve("src/seeds");

const genres = [
  "pop",
  "rock",
  "electronic",
  "jazz",
  "hiphop",
  "classical",
  "world",
];

async function downloadFile(url, destination) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Download failed: ${response.status} ${response.statusText}`
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  await fs.writeFile(destination, buffer);
}

function safeFilename(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchTracks(genre) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    format: "json",
    limit: "50",
    tags: genre,
    audioformat: "mp32",
    audiodlformat: "mp32",
    imagesize: "500",
  });

  const url = `https://api.jamendo.com/v3.0/tracks/?${params}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Jamendo API failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (data.headers.status !== "success") {
    throw new Error(data.headers.error_message);
  }

  return data.results.filter(
    (track) =>
      track.audiodownload_allowed &&
      track.audiodownload
  );
}

async function main() {
  await fs.mkdir(AUDIO_DIR, { recursive: true });
  await fs.mkdir(COVER_DIR, { recursive: true });
  await fs.mkdir(SEED_DIR, { recursive: true });

  console.log("Fetching tracks...\n");

  const selectedTracks = [];

  /*
   * Fetch 10 songs for each genre.
   *
   * We intentionally do NOT globally deduplicate here.
   * A Jamendo track can belong to multiple genres.
   */
  for (const genre of genres) {
    console.log(`Fetching ${genre}...`);

    const tracks = await fetchTracks(genre);

    const genreTracks = tracks.slice(0, SONGS_PER_GENRE);

    for (const track of genreTracks) {
      selectedTracks.push({
        track,
        genre,
      });
    }

    console.log(
      `Selected ${genreTracks.length}/${SONGS_PER_GENRE} songs for ${genre}`
    );
  }

  console.log(
    `\nFound ${selectedTracks.length} downloadable tracks.\n`
  );

  const songs = [];

  for (let i = 0; i < selectedTracks.length; i++) {
    const { track, genre } = selectedTracks[i];

    const index = String(i + 1).padStart(3, "0");

    const slug = safeFilename(track.name);

    const audioFilename = `${index}-${slug}.mp3`;
    const coverFilename = `${index}-${slug}.jpg`;

    const audioPath = path.join(
      AUDIO_DIR,
      audioFilename
    );

    const coverPath = path.join(
      COVER_DIR,
      coverFilename
    );

    console.log(
      `[${i + 1}/${selectedTracks.length}] ` +
        `[${genre}] ` +
        `${track.artist_name} - ${track.name}`
    );

    try {
      // Download audio
      await downloadFile(
        track.audiodownload,
        audioPath
      );

      // Download cover
      await downloadFile(
        track.image,
        coverPath
      );

      songs.push({
        title: track.name,

        artist: track.artist_name,

        album: track.album_name ?? null,

        duration: Number(track.duration),

        audio: `/audio/${audioFilename}`,

        image: `/covers/${coverFilename}`,

        description: `${track.name} by ${track.artist_name}`,

        isFeatured: false,

        releaseDate: track.releasedate
          ? new Date(track.releasedate)
          : null,

        // Keep the genre so your seed script
        // can later resolve it to categoryId.
        genre,

        source: "jamendo",

        sourceId: track.id,

        licenseUrl:
          track.license_ccurl ?? null,

        sourceUrl:
          `https://www.jamendo.com/track/${track.id}`,
      });
    } catch (error) {
      console.error(
        `Failed to download ${track.name}:`,
        error
      );

      // Remove partially downloaded files
      await fs.rm(audioPath, {
        force: true,
      });

      await fs.rm(coverPath, {
        force: true,
      });
    }
  }

  const seedPath = path.join(
    SEED_DIR,
    "songs.json"
  );

  await fs.writeFile(
    seedPath,
    JSON.stringify(songs, null, 2)
  );

  console.log("\n--------------------------------");
  console.log("Music seeding completed");
  console.log("--------------------------------");
  console.log(`Songs: ${songs.length}`);
  console.log(`Audio: ${AUDIO_DIR}`);
  console.log(`Covers: ${COVER_DIR}`);
  console.log(`Seed:  ${seedPath}`);
}

main().catch((error) => {
  console.error("\nSeed failed:");
  console.error(error);

  process.exit(1);
});
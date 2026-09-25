# TuneHub

TuneHub is a music streaming and management app. Browse and play songs, explore categories and albums, manage playlists, and use account and admin tools.

## Features

- Search and browse songs, albums, and categories
- Stream music with a persistent player
- Sign up, sign in, and manage an account
- Create and manage playlists
- Admin tools for managing music and users

## Tech Stack

- **Client:** React 19, TypeScript, Vite, Tailwind CSS, TanStack Query
- **Server:** Node.js, Express, MongoDB with Mongoose
- **Integrations:** Jamendo and Cloudinary

## Prerequisites

- Node.js and pnpm
- A MongoDB database
- Jamendo API credentials
- Cloudinary credentials

The client and server are separate packages. Install dependencies and run each in its own terminal.

## Setup

1. Clone the repository and enter the project directory:

	```bash
	git clone https://github.com/bcu001/TuneHub.git
	cd TuneHub
	```

2. Install the client and server dependencies:

	```bash
	cd client
	pnpm install
	cd ../server
	pnpm install
	```

3. Create `server/.env` with the following values:

	```dotenv
	PORT=8000
	NODE_ENV=development
	DB_URI=mongodb://127.0.0.1:27017
	DB_NAME=tunehub
	CLIENT_URL=http://localhost:5173
	ACCESS_TOKEN_EXPIRE_IN=15m
	REFRESH_TOKEN_EXPIRE_IN=7d
	JWT_ACCESS_SECRET=replace-with-a-long-random-secret
	JWT_REFRESH_SECRET=replace-with-another-long-random-secret
	JAMENDO_CLIENT_ID=your-jamendo-client-id
	CLOUDINARY_NAME=your-cloudinary-cloud-name
	CLOUDINARY_API_KEY=your-cloudinary-api-key
	CLOUDINARY_SECRET_KEY=your-cloudinary-api-secret
	```

	`DB_URI` is the MongoDB connection URI before the database name; the server appends `DB_NAME`. Use your MongoDB Atlas URI instead if you are not running MongoDB locally. The server requires every variable above at startup.

4. Create `client/.env`:

	```dotenv
	VITE_SERVER_URL=http://localhost:8000/api/v3
	```

## Run Locally

Start the backend from the `server` directory:

```bash
pnpm dev
```

Start the frontend from the `client` directory in a second terminal:

```bash
pnpm dev
```

Vite serves the client at `http://localhost:5173` by default. The API is served at `http://localhost:8000/api/v3`.

## Useful Commands

Run these from the relevant package directory:

| Package | Command | Description |
| --- | --- | --- |
| `client` | `pnpm dev` | Start the Vite development server |
| `client` | `pnpm build` | Type-check and build the client |
| `client` | `pnpm lint` | Run ESLint |
| `server` | `pnpm dev` | Start the server with nodemon |
| `server` | `pnpm start` | Start the server |
| `server` | `pnpm seed:songs` | Seed songs into the database |
| `server` | `pnpm download:songs` | Download song assets |

The SQL schema in `sql/` is for the legacy SQL implementation; the current server connects to MongoDB.

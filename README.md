# TuneHub

TuneHub is a full-stack music streaming and management application. Browse and play songs, explore categories, manage playlists, like songs, and use account and admin tools — all from a responsive web or Android app.

## Features

- 🎵 Stream and play music with a persistent global audio player
- 🔍 Search songs by title, description, or artist with paginated results
- 📂 Browse and filter songs by categories and featured status
- ❤️ Like/unlike songs with per-user like tracking
- 🎧 Create, manage, and organize playlists with ordered songs
- 🔐 JWT-based authentication with access & refresh token rotation
- 📱 Android app support via Capacitor
- 🛡️ Admin dashboard for uploading and managing songs (Cloudinary storage)
- ⚙️ Per-user settings (theme preferences)
- 🔑 Password reset flow via email (Nodemailer + Gmail)
- 🛡️ Security: Helmet, CORS, rate limiting, bcrypt password hashing

## Tech Stack

| Layer | Technologies |
| --- | --- |
| **Client** | React 19, TypeScript, Vite 8, Tailwind CSS 4, TanStack Query, Zustand, Shadcn UI, Radix UI, Motion (Framer Motion), React Hook Form, React Router 8, Sonner (toasts), Embla Carousel, Lucide & HugeIcons |
| **Server** | Node.js (>=18), Express 4, MongoDB (Mongoose 9), Cloudinary v2, Multer 2, Nodemailer, Zod 4 validation, JWT (jsonwebtoken), bcryptjs, Morgan, Helmet, express-rate-limit |
| **Mobile** | Capacitor 8 (Android / iOS) |
| **Build & Lint** | Vite, ESLint, TypeScript 6, Prettier |
| **Deployment** | Vercel (both client and server have `vercel.json`) |

## Project Structure

```
TuneHub/
├── client/                       # Frontend React + Vite app
│   ├── src/
│   │   ├── components/           # UI components (Navbar, Sidebar, Player, Cards, Skeletons)
│   │   ├── config/               # Client env & animation config
│   │   ├── context/              # React context (Auth)
│   │   ├── hooks/                # Custom hooks (useAuth, useSong, useLike, usePlaylists, useSetting, useCategory, etc.)
│   │   ├── layouts/              # Layout & AuthLayout wrappers
│   │   ├── lib/                  # Utility functions
│   │   ├── pages/
│   │   │   ├── public/           # Home, Search, Login, Register, ForgetPassword, ResetPassword, SongDetail
│   │   │   ├── user/             # Playlists, PlaylistDetail, PlaylistCreation, LikedSongs, Albums, Settings
│   │   │   └── admin/            # SongAdminDashboard
│   │   ├── queryOptions/         # TanStack Query option factories
│   │   ├── routes/               # Route definitions & guards (ProtectedRoute, AdminRoutes)
│   │   ├── services/             # API service modules (auth, music, player, playlist, like, category, setting, user)
│   │   ├── stores/               # Zustand stores (player)
│   │   └── types/                # TypeScript type definitions
│   ├── android/                  # Capacitor Android project
│   ├── capacitor.config.ts       # Capacitor config (appId: com.tunehub.app)
│   └── vercel.json               # Vercel deployment config
│
├── server/                       # Backend Express API
│   ├── src/
│   │   ├── config/               # env (Zod-validated), CORS, Cloudinary, Multer, Nodemailer
│   │   ├── controllers/
│   │   │   ├── v1/               # Legacy v1 controllers
│   │   │   ├── v2/               # Legacy v2 controllers
│   │   │   └── v3/               # Active v3 controllers
│   │   ├── database/             # MongoDB connection
│   │   ├── lib/                  # apiResponse helper, auth token utils, user normalization, reset email template
│   │   ├── middleware/            # authorize, authorizeAdmin, errorHandler, notFound, multer upload, rateLimiter
│   │   ├── models/               # 12 Mongoose models
│   │   ├── routes/
│   │   │   ├── v1/               # Legacy v1 routes
│   │   │   ├── v2/               # Legacy v2 routes
│   │   │   └── v3/               # Active v3 routes (mounted at /api/v3)
│   │   ├── scripts/              # downloadSongs.js (Jamendo asset downloader)
│   │   ├── seeds/                # Song seed data & uploader script
│   │   ├── app.js                # Express app setup
│   │   └── server.js             # Entry point (connects to DB, starts server)
│   ├── sql/                      # Legacy SQL schema (not used by current server)
│   ├── vercel.json               # Vercel deployment config
│   └── .env.example              # Example environment variables
│
├── notes/                        # Developer notes
├── .gitignore
├── LICENSE                       # MIT License
└── README.md
```

## Database Models

The server uses **MongoDB** with **Mongoose 9**. There are **12 models**:

| Model | Description |
| --- | --- |
| `User` | name, email, password (hashed), role (`admin` \| `user`) |
| `Session` | userId, refreshTokenHash, ip, userAgent, revoked flag — supports multi-device session management |
| `Song` | title, description, artist, audio (url/publicId/duration/format), image (url/publicId), categoryId, isFeatured, stat.likes |
| `Category` | name, slug, description, image, isActive |
| `Album` | name, artist, releaseDate |
| `AlbumSong` | albumId → songId junction table |
| `Playlist` | name, description, image (default Cloudinary placeholder), userId, isPrivate |
| `PlaylistSong` | playlistId → songId junction with `position` for ordering |
| `Like` | userId + songId unique compound index |
| `Stat` | playCount, likeCount (standalone stat tracking) |
| `Setting` | userId, theme (`light` \| `dark`) |
| `PasswordResetToken` | userId, hashed token, expiresAt (TTL auto-delete) |

## API Reference (v3)

Base URL: `/api/v3`

All responses follow a consistent format:
```json
{
  "success": true,
  "message": "description",
  "data": { ... }
}
```

### Authentication

| Method | Endpoint | Auth | Description | Status |
| --- | --- | --- | --- | --- |
| `GET` | `/auth/me` | ✅ Bearer | Get current authenticated user | ✅ Working |
| `POST` | `/auth/signup` | ❌ | Register a new user (name, email, password) | ✅ Working |
| `POST` | `/auth/signin` | ❌ | Sign in, returns accessToken + sets refreshToken cookie | ✅ Working |
| `POST` | `/auth/signout` | ✅ Bearer | Revoke current session, clear cookie | ✅ Working |
| `POST` | `/auth/signout-all` | ✅ Bearer | Revoke all sessions for the user | ✅ Working |
| `POST` | `/auth/refresh` | 🍪 Cookie | Rotate refresh token, return new access token | ✅ Working |
| `POST` | `/auth/request-reset` | ❌ | Send password reset email | ✅ Working |
| `POST` | `/auth/reset` | ❌ | Reset password with token + newPassword | ✅ Working |

### Songs

| Method | Endpoint | Auth | Description | Status |
| --- | --- | --- | --- | --- |
| `GET` | `/songs` | ❌ | List songs with search (`q`), filter (`categoryId`, `featured`), sort (`newest`, `oldest`, `popular`, `mostLiked`, `title`), pagination (`page`) | ✅ Working |
| `POST` | `/songs` | ✅ Admin | Upload a song with audio + image files (multipart) → Cloudinary | ✅ Working |
| `GET` | `/songs/featured` | ❌ | Get featured songs (limit 1–10, default 8) | ✅ Working |
| `GET` | `/songs/:id` | ❌ | Get a single song by ID | ✅ Working |
| `PATCH` | `/songs/:id` | — | Update a song | 🚧 Under Development |
| `DELETE` | `/songs/:id` | — | Delete a song | 🚧 Under Development |
| `PATCH` | `/songs/:id/like` | ✅ Bearer | Increment song stat.likes | ✅ Working |
| `PATCH` | `/songs/:id/unlike` | ✅ Bearer | Decrement song stat.likes | ✅ Working |
| `GET` | `/songs/:id/stream` | — | Stream a song | 🚧 Under Development |
| `POST` | `/songs/:id/play` | — | Record a play event | 🚧 Under Development |

### Likes

| Method | Endpoint | Auth | Description | Status |
| --- | --- | --- | --- | --- |
| `GET` | `/likes` | ✅ Bearer | Get all liked songs for current user (paginated) | ✅ Working |
| `POST` | `/likes/:songId` | ✅ Bearer | Like a song (creates Like record + increments stat) | ✅ Working |
| `DELETE` | `/likes/:songId` | ✅ Bearer | Unlike a song (removes Like record + decrements stat) | ✅ Working |
| `GET` | `/likes/:songId/status` | ✅ Bearer | Check if current user has liked a song | ✅ Working |
| `GET` | `/likes/:songId/count` | ✅ Bearer | Get total like count for a song | ✅ Working |

### Playlists

| Method | Endpoint | Auth | Description | Status |
| --- | --- | --- | --- | --- |
| `GET` | `/playlists` | ✅ Bearer | Get all playlists for current user | ✅ Working |
| `POST` | `/playlists` | ✅ Bearer | Create a playlist (name, description) | ✅ Working |
| `GET` | `/playlists/:id` | ✅ Bearer | Get playlist by ID | ✅ Working |
| `PATCH` | `/playlists/:id` | ✅ Bearer | Update a playlist | 🚧 Under Development |
| `DELETE` | `/playlists/:id` | ✅ Bearer | Delete a playlist | 🚧 Under Development |
| `GET` | `/playlists/:id/songs` | ✅ Bearer | Get songs in a playlist (sorted by position) | ✅ Working |
| `POST` | `/playlists/:id/song/:songId` | ✅ Bearer | Add a song to a playlist | ✅ Working |
| `DELETE` | `/playlists/:id/song/:songId` | ✅ Bearer | Remove a song from a playlist (auto-reorders remaining) | ✅ Working |
| `PATCH` | `/playlists/:id/song/:songId/reorder` | ✅ Bearer | Reorder songs in a playlist | 🚧 Under Development |

### Categories

| Method | Endpoint | Auth | Description | Status |
| --- | --- | --- | --- | --- |
| `GET` | `/categories` | ❌ | List active categories (paginated, configurable limit) | ✅ Working |
| `GET` | `/categories/:id` | ❌ | Get category by ID | ✅ Working |

### Albums

| Method | Endpoint | Auth | Description | Status |
| --- | --- | --- | --- | --- |
| — | `/albums` | — | No endpoints implemented yet | 🚧 Planned |

### Users

| Method | Endpoint | Auth | Description | Status |
| --- | --- | --- | --- | --- |
| `GET` | `/users` | ✅ Admin | List all users (admin only) | ✅ Working |
| `GET` | `/users/:id` | ✅ Bearer | Get user by ID (own profile only) | ✅ Working |

### Stats

| Method | Endpoint | Auth | Description | Status |
| --- | --- | --- | --- | --- |
| `POST` | `/stats/:id` | ✅ Bearer | Increment likeCount on a Stat document | ✅ Working |
| `DELETE` | `/stats/:id` | ✅ Bearer | Decrement likeCount on a Stat document | ✅ Working |

### Settings

| Method | Endpoint | Auth | Description | Status |
| --- | --- | --- | --- | --- |
| `GET` | `/setting` | ✅ Bearer | Get user settings (auto-creates with defaults if missing) | ✅ Working |
| `PATCH` | `/setting` | ✅ Bearer | Update user settings | ✅ Working |

## Middleware Stack

| Middleware | Purpose |
| --- | --- |
| `express.json()` | Parse JSON request bodies |
| `cookie-parser` | Parse cookies (refresh tokens) |
| `cors` | Restrict origins to `CLIENT_URL` + mobile app hostname |
| `morgan("tiny")` | HTTP request logging |
| `helmet` | Security headers |
| `rateLimiter` | 300 requests per 15-minute window |
| `authorize` | JWT Bearer token validation → sets `req.user` |
| `authorizeAdmin` | Checks `req.user.role === 'admin'` |
| `configureUploadFields` | Multer multipart upload (audio + image, max 50 MB each) |
| `notFound` | 404 handler for unmatched routes |
| `errorHandler` | Global error handler with status code normalization |

## Client Pages & Routes

| Route | Page | Access |
| --- | --- | --- |
| `/` | Home (Hero, Featured Songs, Categories) | Public |
| `/search` | Search songs with filters & sorting | Public |
| `/songs/:id` | Song detail | Public |
| `/login` | Sign in | Guest only |
| `/register` | Sign up | Guest only |
| `/forget-password` | Request password reset email | Guest only |
| `/reset-password` | Reset password with token | Guest only |
| `/playlists` | User playlists | 🔒 Authenticated |
| `/playlists/create` | Create new playlist | 🔒 Authenticated |
| `/playlists/:id` | Playlist detail with songs | 🔒 Authenticated |
| `/liked` | Liked songs | 🔒 Authenticated |
| `/albums` | Albums list | 🔒 Authenticated |
| `/albums/:id` | Album detail | 🔒 Authenticated |
| `/setting` | User settings (theme) | 🔒 Authenticated |
| `/admin` | Admin song dashboard (upload songs) | 🔒 Admin only |
| `/*` | 404 Not Found | — |

## Prerequisites

- **Node.js** >= 18 and **pnpm** (latest)
- **MongoDB** (local or Atlas) with connection URI
- **Cloudinary** account (for song audio & image storage)
- **Gmail App Password** (for password reset emails via Nodemailer)
- **Jamendo API** client ID (for song download scripts)

## Setup

1. Clone the repository:

	```bash
	git clone https://github.com/bcu001/TuneHub.git
	cd TuneHub
	```

2. Install dependencies for both client and server:

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
	EMAIL_USER=your-gmail-address
	EMAIL_PASS=your-gmail-app-password
	```

	> `DB_URI` is the MongoDB connection string (without the database name). The server appends `DB_NAME` at runtime. All variables listed above are **required** — the server validates them with Zod at startup and will fail fast if any are missing.

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

- Client: `http://localhost:5173`
- API: `http://localhost:8000/api/v3`

## Useful Commands

| Package | Command | Description |
| --- | --- | --- |
| `client` | `pnpm dev` | Start the Vite development server |
| `client` | `pnpm build` | Type-check and build the client for production |
| `client` | `pnpm lint` | Run ESLint |
| `client` | `pnpm preview` | Preview the production build locally |
| `server` | `pnpm dev` | Start the server with nodemon (hot reload) |
| `server` | `pnpm start` | Start the server (production) |
| `server` | `pnpm seed:songs` | Seed songs into the database from JSON |
| `server` | `pnpm download:songs` | Download song assets from Jamendo API |

## Deployment

Both the client and server include `vercel.json` configs for deployment on **Vercel**:

- **Server**: Deployed as a Vercel Serverless Function (`@vercel/node`) with all routes pointing to `src/server.js`.
- **Client**: Standard Vite static build.

## Mobile (Capacitor)

The client is configured for native mobile builds using **Capacitor 8**:

- **App ID**: `com.tunehub.app`
- **Android project**: `client/android/`
- Build the web assets first (`pnpm build`), then sync with Capacitor.

## Legacy API Versions

The `server/src/routes/v1/` and `server/src/routes/v2/` directories contain legacy API route definitions from earlier iterations. They are **not mounted** in the current server — only **v3** routes are active.

The `server/sql/` directory contains the legacy SQL schema from before the migration to MongoDB.

## License

This project is licensed under the [MIT License](LICENSE).

© 2026 Bhuwan Chandra Upadhyay

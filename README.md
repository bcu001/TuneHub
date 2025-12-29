# TuneHub: Online Music Streaming and Management Platform

TuneHub is an online music streaming and management platform that allows users to search, play, and organize their favorite music. It provides features like user authentication, playlist management, an admin panel for content control, and more.

## Features

- **User Authentication**: Secure login and signup system.
- **Music Search & Playback**: Search music by genre, artist, or song name and play instantly.
- **Playlist Management**: Create, edit, and delete playlists.
- **User Profile & Settings**: Manage user details and preferences.
- **Admin Panel**: View users, promote/demote user roles.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Version Control**: Git & GitHub

## Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/bcu001/TuneHub.git
cd TuneHub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up the Database
- Create a MySQL database.
- Import the provided database schema.
- Update `config/connect.js` with your database credentials.

### 4. Run the Application
```bash
npm run dev
```
The server will start at `http://localhost:8000`.

# BeatArena 🎵

![Node.js](https://img.shields.io/badge/Node.js-22.0.0-%23339933?logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/React-18.2.0-%2361DAFB?logo=react&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-14.2.0-%23000000?logo=nextdotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.0-%233178C6?logo=typescript&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-4.5.0-%23333?logo=zustand&logoColor=white) ![Tailwind%20CSS](https://img.shields.io/badge/TailwindCSS-3.4.0-%2306B6D4?logo=tailwindcss&logoColor=white) ![Laravel](https://img.shields.io/badge/Laravel-11.0-%23FF2D20?logo=laravel&logoColor=white) ![PHP](https://img.shields.io/badge/PHP-8.3-%23777BB4?logo=php&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-8.0-%2300f?logo=mysql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-24.0-%232496ED?logo=docker&logoColor=white)

**BeatArena** is an interactive, rhythm‑based web game where players compete against AI opponents or friends in real‑time challenges. The project now includes:

- **Language‑specific solo leaderboards** (English & Hindi) with separate rankings.
- **Persistent language selection** – the chosen language is saved in `localStorage` and restored on page refresh.
- **Animated music visualizer** and **dynamic timer colors** for a premium UI experience.
- **Scrollable, fixed‑height leaderboard** with glass‑morphism styling.
- **Improved answer button animations** (gradient backgrounds, icons, hover effects).
- **Multiplayer challenge flow** with lobby, code‑based rooms, and result submission.
- **State persistence** via Zustand’s `persist` middleware, keeping game progress across refreshes.

---

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running with Docker](#running-with-docker)
- [Development](#development)
- [Managing Songs](#managing-songs)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Real‑time rhythm gameplay** with visual beat indicators.
- **AI opponent** that adapts to player performance.
- **Multi‑language song selection** (English, Hindi) with language‑specific leaderboards.
- **Persistent language choice** – saved in `localStorage` and restored automatically.
- **Responsive UI** for desktop and mobile devices.
- **Animated music visualizer** that reacts to the game state.
- **Dynamic timer** that changes color (green → yellow → red) as time runs out.
- **Scrollable leaderboard** with a fixed max‑height and smooth scrollbars.
- **Multiplayer challenges** – create, join, and play with friends using unique challenge codes.
- **Docker‑compose** setup for easy local development.

---

## Demo
A live demo is hosted at `https://beatarena.example.com` (replace with your URL).

---

## Tech Stack
- **Backend**: PHP (Laravel 11) – API routes in `backend/routes/api.php`, Dockerised with a multi‑stage `Dockerfile`.
- **Frontend**: React 18 + Next.js 14 – components in `frontend/src/`.
- **State Management**: Zustand with `persist` middleware for storing game state and selected language.
- **Styling**: Tailwind CSS + custom glass‑morphism utilities.
- **Audio**: `yt-dlp` for downloading test tracks, stored under `backend/storage/app/public/songs/`.
- **Containerization**: Docker Compose (frontend, backend, MySQL).

---

## Installation
```bash
# Clone the repository
git clone https://github.com/abhishekpanda0620/BeatArena.git
cd BeatArena

# Backend dependencies
composer install

# Frontend dependencies
cd frontend && npm install && cd ..
```

1. Copy `.env.example` to `.env` in the backend folder and adjust DB/APP settings.
2. Generate the Laravel app key:
```bash
php artisan key:generate
```
3. Run migrations (including the new `language` column on `solo_scores`):
```bash
php artisan migrate
```

---

## Running with Docker
```bash
# From the project root
docker compose up -d --build
```
- Backend: `http://localhost:8000`
- Frontend (Next.js): `http://localhost:3000`
- To stop:
```bash
docker compose down
```

---

## Development
### Backend
- API routes are defined in `backend/routes/api.php`.
- The `SoloScoreController` now accepts a `language` field and returns language‑filtered leaderboards.

### Frontend
- Entry point: `frontend/src/app/main.tsx`.
- Key components:
  - `SoloGame.tsx` – core game UI with visualizer, timer, and answer buttons.
  - `Leaderboard.tsx` – reusable component with scrollable container.
  - `MusicVisualizer.tsx` – animated bar visualizer.
- State is managed via `frontend/src/store/gameStore.ts` (Zustand + `persist`).
- To start the dev server:
```bash
cd frontend
npm run dev
```

---

## Managing Songs
1. **Update the download script** (`backend/download_songs.sh`) with new songs.
2. **Add song metadata** to `backend/database/seeders/SongSeeder.php`.
3. Run the script and reseed:
```bash
cd backend && ./download_songs.sh
docker compose exec backend php artisan migrate:refresh --seed
```

---

## Contributing
Contributions are welcome! Please follow these steps:
{{ ... }}

## License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

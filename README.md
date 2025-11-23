# BeatArena 🎵

**BeatArena** is an interactive web‑based rhythm game where players compete against AI‑driven opponents in a dynamic music‑driven arena. The project combines a Laravel/PHP backend for song storage and API endpoints with a modern React/Next.js (or Vite) frontend built in TypeScript and Tailwind‑styled components.

---

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running with Docker](#running-with-docker)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Real‑time rhythm gameplay** with visual beat indicators.
- **AI opponent** that adapts to player performance.
- **Multi‑language song selection** (English, Hindi, etc.).
- **Responsive UI** for desktop and mobile devices.
- **Docker‑compose** setup for easy local development.

---

## Demo
A live demo is hosted at `https://beatarena.example.com` (replace with your URL).

---

## Tech Stack
- **Backend**: PHP (Laravel) – API routes in `backend/routes/api.php`, Dockerised with a multi‑stage `Dockerfile`.
- **Frontend**: React + TypeScript, Vite (or Next.js) – components in `frontend/src/`.
- **State Management**: Zustand store for game state and language selection.
- **Styling**: Vanilla CSS with custom design tokens (glassmorphism, dark mode).
- **Audio**: `yt-dlp` for downloading test tracks, stored under `backend/storage/app/public/songs/`.

---

## Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/abhishekpanda0620/BeatArena.git
   cd BeatArena
   ```
2. **Install dependencies**
   ```bash
   # Backend (PHP)
   composer install
   # Frontend (Node.js)
   cd frontend && npm install && cd ..
   ```
3. **Set up environment variables**
   - Copy `.env.example` to `.env` in the backend directory and adjust DB/APP settings.
   - Ensure `APP_URL` matches your local host (e.g., `http://localhost`).
4. **Generate application key** (Laravel)
   ```bash
   php artisan key:generate
   ```
5. **Run migrations** (if any)
   ```bash
   php artisan migrate
   ```

---

## Running with Docker
The project ships with a `docker-compose.yml` that builds both backend and frontend services.
```bash
# From the project root
docker compose up -d --build
```
- The backend will be available at `http://localhost:8000`.
- The frontend dev server runs on `http://localhost:5173` (Vite) or `http://localhost:3000` (Next.js) depending on the chosen framework.
- To stop the containers:
  ```bash
  docker compose down
  ```

---

## Development
### Backend
- API routes are defined in `backend/routes/api.php`.
- Add new endpoints or modify existing ones, then run `php artisan serve` for a local PHP server.

### Frontend
- Main entry point: `frontend/src/app/main.tsx`.
- Key components:
  - `SoloGame.tsx` – the core game UI.
  - `globals.css` – global styling (dark mode, glassmorphism).
- State is managed via `frontend/src/store/gameStore.ts` (Zustand).
- To start the dev server:
  ```bash
  cd frontend
  npm run dev
  ```

---

## Managing Songs
To add new songs to the game:
1.  **Update the Download Script**: Add a new `download_song` line to `backend/download_songs.sh`.
    ```bash
    download_song "Song Title" "Search Query ringtone" "$STORAGE_DIR/language/filename.mp3"
    ```
2.  **Update the Database Seeder**: Add the song metadata to `backend/database/seeders/SongSeeder.php`.
3.  **Run the Updates**:
    ```bash
    # 1. Download the files
    cd backend && ./download_songs.sh
    
    # 2. Update the database (reset)
    docker compose exec backend php artisan migrate:refresh --seed
    ```

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes with clear messages.
4. Open a Pull Request targeting the `main` branch.
5. Ensure linting passes (`npm run lint` and `composer lint`).

---

## License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---


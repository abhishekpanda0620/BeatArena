# 🎮 BeatArena

**The Ultimate Multiplayer Music Quiz Game**

BeatArena is a real-time multiplayer "Guess the Song" game featuring English and Hindi tracks. Test your music knowledge solo or compete with friends!

---

## ✨ Features

### Phase 1 - Solo Mode (MVP) ✅
- 🎵 **Music Quiz**: Listen to 5-8 second audio clips and guess the song
- 🌍 **Multi-language**: Support for English and Hindi tracks
- ⏱️ **Timed Rounds**: 10-second countdown per round
- 🎯 **MCQ Format**: Choose from 4 options
- 📊 **Score Tracking**: Real-time scoring system
- 🎨 **Premium UI**: Modern dark mode with glassmorphism effects

### Phase 2 - Multiplayer (Coming Soon)
- 🚪 **Room System**: Create/Join game rooms
- 👥 **Real-time Play**: Synchronized gameplay via WebSockets
- 🏆 **Live Leaderboard**: Compete with friends
- ⚡ **Speed Bonus**: Faster correct answers = more points

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: ShadCN/UI
- **State Management**: Zustand
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Real-time** (Future): Laravel Echo + Reverb

### Backend
- **Framework**: Laravel 11
- **Language**: PHP 8.3
- **Database**: MySQL 8.0
- **Authentication**: Laravel Sanctum
- **Broadcasting** (Future): Laravel Reverb

### DevOps
- **Containerization**: Docker (Multi-stage builds)
- **Orchestration**: Docker Compose
- **Web Server**: Nginx (for Laravel)

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhishekpanda0620/BeatArena.git
   cd BeatArena
   ```

2. **Start the services**
   ```bash
   docker compose up -d --build
   ```

3. **Run migrations and seed data**
   ```bash
   docker exec beatarena-backend php artisan migrate:fresh --seed
   ```

4. **Access the application**
   - Frontend: [http://localhost:3030](http://localhost:3030)
   - Backend API: [http://localhost:8787](http://localhost:8787)
   - MySQL: `localhost:3308`

---

## 📁 Project Structure

```
BeatArena/
├── frontend/           # Next.js application
│   ├── src/
│   │   ├── app/       # App router pages
│   │   ├── components/ # React components
│   │   ├── store/     # Zustand state management
│   │   └── lib/       # Utilities and helpers
│   └── Dockerfile
│
├── backend/           # Laravel API
│   ├── app/
│   │   ├── Models/    # Eloquent models
│   │   └── Http/Controllers/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   └── Dockerfile
│
├── docker-compose.yml
├── plan/              # Phase-wise implementation plans
└── README.md
```

---

## 🎮 How to Play

1. **Select Language**: Choose between English or Hindi tracks
2. **Click "Play Solo"**: Start a 10-round game
3. **Listen & Guess**: Each round plays a short audio clip
4. **Select Answer**: Choose from 4 options within 10 seconds
5. **View Score**: See your final score at the end

---

## 🔧 Development

### Running Locally (Without Docker)

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
composer install
php artisan serve
```

### Environment Variables

#### Backend (.env)
```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=beatarena
DB_USERNAME=root
DB_PASSWORD=password
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8787
```

---

## 🧪 Testing

### Linting
```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
./vendor/bin/phpstan analyse
```

### Build Verification
```bash
# Frontend
cd frontend
npm run build
```

---

## 📋 API Endpoints

### Songs
- `GET /api/songs` - Get all songs
- `GET /api/songs/random?limit=10&language=en` - Get random songs

---

## 🗺️ Roadmap

- [x] Phase 0: Foundation & Scaffolding
- [x] Phase 1: Solo Mode MVP
- [ ] Phase 2: Backend Integration & Data Layer
- [ ] Phase 3: Multiplayer Infrastructure (Laravel Reverb)
- [ ] Phase 4: Multiplayer Gameplay
- [ ] Phase 5: Polish & Deployment
- [ ] User Authentication
- [ ] Global Leaderboards
- [ ] Spotify/YouTube Integration

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abhishek Panda**
- GitHub: [@abhishekpanda0620](https://github.com/abhishekpanda0620)
- Email: abhishek.panda0620@gmail.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Laravel](https://laravel.com/)
- [ShadCN/UI](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)

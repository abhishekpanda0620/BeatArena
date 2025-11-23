import { create } from 'zustand';

export interface Song {
    id: number;
    title: string;
    artist: string;
    audio_url: string;
    options: string[]; // For MCQ
    correct_option: string;
    language: string; // added language field
}

interface GameState {
    isPlaying: boolean;
    currentRound: number;
    score: number;
    songs: Song[];
    currentSong: Song | null;
    gameOver: boolean;
    selectedLanguage: string;
    
    setSongs: (songs: Song[]) => void;
    setLanguage: (language: string) => void;
    startGame: () => void;
    nextRound: () => void;
    submitAnswer: (answer: string, timeLeft?: number) => boolean;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    isPlaying: false,
    currentRound: 0,
    score: 0,
    songs: [],
    currentSong: null,
    gameOver: false,
    selectedLanguage: typeof window !== 'undefined' ? localStorage.getItem('selectedLanguage') || 'en' : 'en',

    setSongs: (songs) => set({ songs }),
    
    setLanguage: (language) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedLanguage', language);
        }
        set({ selectedLanguage: language });
    },

    startGame: () => {
        const { songs } = get();
        if (songs.length === 0) return;
        set({ 
            isPlaying: true, 
            currentRound: 1, 
            score: 0, 
            gameOver: false,
            currentSong: songs[0] 
        });
    },

    nextRound: () => {
        const { currentRound, songs } = get();
        if (currentRound >= songs.length) {
            set({ gameOver: true, isPlaying: false });
        } else {
            set({ 
                currentRound: currentRound + 1, 
                currentSong: songs[currentRound] 
            });
        }
    },

    submitAnswer: (answer, timeLeft = 0) => {
        const { currentSong, score } = get();
        if (!currentSong) return false;

        const isCorrect = answer === currentSong.correct_option;
        if (isCorrect) {
            // Base score 10 + bonus for time left
            // If answered immediately (20s left), score = 10 + 20 = 30
            // If answered at last second (1s left), score = 10 + 1 = 11
            set({ score: score + 10 + timeLeft });
        }
        return isCorrect;
    },

    resetGame: () => set({
        isPlaying: false,
        currentRound: 0,
        score: 0,
        gameOver: false,
        currentSong: null
    })
}));

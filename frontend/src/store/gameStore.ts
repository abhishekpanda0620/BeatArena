import { create } from 'zustand';

export interface Song {
    id: number;
    title: string;
    artist: string;
    audio_url: string;
    options: string[]; // For MCQ
    correct_option: string;
}

interface GameState {
    isPlaying: boolean;
    currentRound: number;
    score: number;
    songs: Song[];
    currentSong: Song | null;
    gameOver: boolean;
    
    setSongs: (songs: Song[]) => void;
    startGame: () => void;
    nextRound: () => void;
    submitAnswer: (answer: string) => boolean;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    isPlaying: false,
    currentRound: 0,
    score: 0,
    songs: [],
    currentSong: null,
    gameOver: false,

    setSongs: (songs) => set({ songs }),

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

    submitAnswer: (answer) => {
        const { currentSong, score } = get();
        if (!currentSong) return false;

        const isCorrect = answer === currentSong.correct_option;
        if (isCorrect) {
            set({ score: score + 10 }); // Simple scoring
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

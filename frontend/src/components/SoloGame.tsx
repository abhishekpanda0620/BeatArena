"use client";

import { useEffect, useState, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Volume2, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Leaderboard from "@/components/Leaderboard";
import MusicVisualizer from "@/components/MusicVisualizer";

interface SoloGameProps {
    hideLeaderboard?: boolean;
}

interface Score {
    player_name: string;
    score: number;
    time_taken: number;
}

export default function SoloGame({ hideLeaderboard = false }: SoloGameProps = {}) {
    const { 
        currentSong, 
        currentRound, 
        score, 
        submitAnswer, 
        nextRound, 
        gameOver, 
        resetGame,
        songs
    } = useGameStore();
    
    const [timeLeft, setTimeLeft] = useState(20);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [leaderboard, setLeaderboard] = useState<Score[]>([]);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [gameStartTime] = useState(Date.now());
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const router = useRouter();

    // Reset state when song changes
    useEffect(() => {
        if (currentSong) {
            setTimeLeft(20);
            setIsAnswered(false);
            setSelectedOption(null);
        }
    }, [currentSong]);

    // Audio Logic
    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.src = currentSong.audio_url;
            audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
        }
    }, [currentSong]);

    const handleTimeUp = () => {
        setIsAnswered(true);
        setTimeout(() => nextRound(), 2000);
    };

    // Timer Logic
    useEffect(() => {
        if (isAnswered || !currentSong) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    // We can't call handleTimeUp directly here because it depends on state/props
                    // and we want to avoid stale closures or complex dependencies.
                    // Instead, we'll trigger the end of round in the effect cleanup or check in render.
                    // But for simplicity, let's just clear interval and trigger next step.
                    clearInterval(timer);
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAnswered, currentSong]); // handleTimeUp is stable enough or we can ignore it for this simple timer logic

    const handleOptionClick = (option: string) => {
        if (isAnswered) return;
        
        setSelectedOption(option);
        submitAnswer(option, timeLeft);
        setIsAnswered(true);

        setTimeout(() => nextRound(), 2000);
    };

    const handleSubmitScore = async () => {
        if (!playerName.trim()) {
            alert('Please enter your name');
            return;
        }

        setIsSubmitting(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
            const response = await fetch(`${apiUrl}/api/solo/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    player_name: playerName,
                    score: score,
                    time_taken: Math.floor((Date.now() - gameStartTime) / 1000),
                }),
            });

            if (!response.ok) throw new Error('Failed to submit score');
            
            setHasSubmitted(true);
            fetchLeaderboard();
        } catch (error) {
            console.error('Failed to submit score:', error);
            alert('Failed to submit score');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchLeaderboard = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
            const response = await fetch(`${apiUrl}/api/solo/leaderboard`);
            if (!response.ok) throw new Error('Failed to fetch leaderboard');
            const data = await response.json();
            setLeaderboard(data);
            setShowLeaderboard(true);
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error);
        }
    };

    if (gameOver) {

        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-xy z-0 pointer-events-none" />
                
                <div className="z-10 w-full max-w-2xl space-y-6">
                    <Card className="p-8 bg-black/40 backdrop-blur-md border-white/10 text-center shadow-2xl shadow-purple-900/20">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Game Over!</h2>
                        <p className="text-2xl mb-8">Final Score: <span className="text-purple-400 font-bold">{score}</span></p>
                        
                        {!hideLeaderboard && !hasSubmitted ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    className="w-full h-12 px-4 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder:text-neutral-500"
                                    maxLength={50}
                                />
                                <Button 
                                    onClick={handleSubmitScore}
                                    disabled={isSubmitting || !playerName.trim()}
                                    className="w-full h-12 font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-900/20 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit to Leaderboard'}
                                </Button>
                                {!showLeaderboard && (
                                    <Button 
                                        onClick={fetchLeaderboard}
                                        variant="outline"
                                        className="w-full h-12 border-neutral-700 hover:bg-neutral-800 hover:text-white"
                                    >
                                        View Global Leaderboard
                                    </Button>
                                )}
                            </div>
                        ) : !hideLeaderboard && hasSubmitted ? (
                            <p className="text-green-400 mb-4">✓ Score submitted successfully!</p>
                        ) : null}

                        <div className="flex gap-4 justify-center mt-6">
                            <Button onClick={() => { resetGame(); router.push('/'); }} variant="outline" className="border-neutral-700 hover:bg-neutral-800 hover:text-white">
                                Back to Home
                            </Button>
                            <Button onClick={() => window.location.reload()} className="font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-[1.05]">
                                Play Again
                            </Button>
                        </div>
                    </Card>

                    {!hideLeaderboard && showLeaderboard && (
                        <Leaderboard scores={leaderboard} title="Global Leaderboard" currentPlayerName={playerName} />
                    )}
                </div>
            </div>
        );
    }

    if (!currentSong) return <div className="text-white">Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4 relative overflow-hidden">
             {/* Background Blur */}
             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-xy z-0 pointer-events-none" />

            <div className="z-10 w-full max-w-2xl space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center text-xl font-bold">
                    <div className="text-neutral-400">Round {currentRound} / {songs.length}</div>
                    <div className="text-purple-400">Score: {score}</div>
                </div>

                {/* Timer */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className={`font-bold ${
                            timeLeft <= 5 ? 'text-red-400 animate-pulse' : 
                            timeLeft <= 10 ? 'text-yellow-400' : 
                            'text-neutral-400'
                        }`}>
                            {timeLeft}s remaining
                        </span>
                    </div>
                    <Progress 
                        value={(timeLeft / 20) * 100} 
                        className="h-3 bg-neutral-800" 
                        indicatorClassName={`transition-colors duration-300 ${
                            timeLeft <= 5 ? 'bg-red-500' : 
                            timeLeft <= 10 ? 'bg-yellow-500' : 
                            'bg-purple-500'
                        }`} 
                    />
                </div>

                {/* Visualizer */}
                <div className="h-56 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10" />
                    <MusicVisualizer isPlaying={!isAnswered} />
                    <p className="text-neutral-400 mt-4 text-sm">Listen carefully...</p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSong.options.map((option, idx) => {
                        let btnClass = "h-20 text-lg font-semibold transition-all duration-300 border-2 border-neutral-700 bg-gradient-to-br from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-900/20";
                        let icon = null;
                        
                        if (isAnswered) {
                            if (option === currentSong.correct_option) {
                                btnClass = "h-20 text-lg font-bold bg-gradient-to-br from-green-600/30 to-green-700/20 border-2 border-green-500 text-green-300 hover:from-green-600/30 hover:to-green-700/20 animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-lg shadow-green-900/30";
                                icon = <CheckCircle className="w-6 h-6 inline mr-2" />;
                            } else if (option === selectedOption) {
                                btnClass = "h-20 text-lg font-bold bg-gradient-to-br from-red-600/30 to-red-700/20 border-2 border-red-500 text-red-300 hover:from-red-600/30 hover:to-red-700/20 animate-in fade-in shake duration-500 shadow-lg shadow-red-900/30";
                                icon = <XCircle className="w-6 h-6 inline mr-2" />;
                            } else {
                                btnClass = "h-20 text-lg opacity-40 bg-neutral-900/50 border-2 border-neutral-800 pointer-events-none";
                            }
                        }

                        return (
                            <Button 
                                key={idx} 
                                variant="outline" 
                                className={btnClass}
                                onClick={() => handleOptionClick(option)}
                                disabled={isAnswered}
                            >
                                {icon}
                                {option}
                            </Button>
                        );
                    })}
                </div>

                {/* Hidden Audio Player */}
                <audio ref={audioRef} className="hidden" />
            </div>
        </div>
    );
}

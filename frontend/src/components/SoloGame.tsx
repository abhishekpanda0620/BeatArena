"use client";

import { useEffect, useState, useRef } from "react";
import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Volume2, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SoloGame() {
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

    if (gameOver) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
                <Card className="p-8 bg-neutral-900 border-neutral-800 text-center max-w-md w-full">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Game Over!</h2>
                    <p className="text-2xl mb-8">Final Score: <span className="text-purple-400 font-bold">{score}</span></p>
                    <div className="flex gap-4 justify-center">
                        <Button onClick={() => { resetGame(); router.push('/'); }} variant="outline">
                            Back to Home
                        </Button>
                        <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700">
                            Play Again
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    if (!currentSong) return <div className="text-white">Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4 relative overflow-hidden">
             {/* Background Blur */}
             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black z-0 pointer-events-none" />

            <div className="z-10 w-full max-w-2xl space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center text-xl font-bold">
                    <div className="text-neutral-400">Round {currentRound} / {songs.length}</div>
                    <div className="text-purple-400">Score: {score}</div>
                </div>

                {/* Timer */}
                <Progress value={(timeLeft / 20) * 100} className="h-2 bg-neutral-800" indicatorClassName="bg-purple-500" />

                {/* Visualizer / Icon */}
                <div className="h-48 flex items-center justify-center bg-neutral-900/50 rounded-2xl border border-neutral-800 shadow-2xl animate-pulse">
                    <Volume2 className="w-24 h-24 text-purple-500 opacity-80" />
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSong.options.map((option, idx) => {
                        let btnClass = "h-16 text-lg font-medium transition-all duration-300 border-neutral-700 bg-neutral-800 hover:bg-neutral-700";
                        
                        if (isAnswered) {
                            if (option === currentSong.correct_option) {
                                btnClass = "h-16 text-lg font-bold bg-green-600/20 border-green-500 text-green-400 hover:bg-green-600/20";
                            } else if (option === selectedOption) {
                                btnClass = "h-16 text-lg font-bold bg-red-600/20 border-red-500 text-red-400 hover:bg-red-600/20";
                            } else {
                                btnClass = "h-16 text-lg opacity-50 bg-neutral-900 border-neutral-800";
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
                                {option}
                                {isAnswered && option === currentSong.correct_option && <CheckCircle className="ml-2 w-5 h-5" />}
                                {isAnswered && option === selectedOption && option !== currentSong.correct_option && <XCircle className="ml-2 w-5 h-5" />}
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

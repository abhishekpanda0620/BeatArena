"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import SoloGame from "@/components/SoloGame";

export default function ChallengePlayPage() {
    const router = useRouter();
    const params = useParams();
    const code = params.code as string;
    
    const { setSongs, startGame, resetGame, gameOver, score } = useGameStore();
    const [isLoading, setIsLoading] = useState(true);
    const [startTime, setStartTime] = useState<number>(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        // Reset game state
        resetGame();
        
        // Fetch challenge and songs
        const fetchChallenge = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
                const response = await fetch(`${apiUrl}/api/challenges/${code}`);
                
                if (!response.ok) {
                    throw new Error('Challenge not found');
                }

                const data = await response.json();
                setSongs(data.songs);
                startGame();
                setStartTime(Date.now());
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to load challenge:", error);
                alert("Failed to load challenge");
                router.push("/multiplayer");
            }
        };

        fetchChallenge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    useEffect(() => {
        // Submit score when game is over
        if (gameOver && !hasSubmitted && startTime > 0) {
            submitScore();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameOver]);

    const submitScore = async () => {
        const playerName = localStorage.getItem('playerName') || 'Anonymous';
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
            const response = await fetch(`${apiUrl}/api/challenges/${code}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    player_name: playerName,
                    score: score,
                    time_taken: timeTaken,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                if (response.status === 409) {
                    alert("You've already submitted a score for this challenge!");
                } else {
                    throw new Error(error.error || 'Failed to submit score');
                }
            }

            setHasSubmitted(true);
            // Redirect to results after a short delay
            setTimeout(() => {
                router.push(`/multiplayer/challenge/${code}`);
            }, 2000);
        } catch (error) {
            console.error("Failed to submit score:", error);
            alert("Failed to submit score. Redirecting to lobby...");
            router.push(`/multiplayer/challenge/${code}`);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
                <p className="text-xl">Loading challenge...</p>
            </div>
        );
    }

    return <SoloGame hideLeaderboard={true} />;
}

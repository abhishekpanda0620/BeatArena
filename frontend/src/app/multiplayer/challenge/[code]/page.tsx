"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Leaderboard from "@/components/Leaderboard";

interface ChallengeResult {
    id: number;
    player_name: string;
    score: number;
    time_taken: number;
    completed_at: string;
}

interface Challenge {
    id: number;
    challenge_code: string;
    creator_name: string;
    language: string;
    status: string;
}

export default function ChallengeLobbyPage() {
    const router = useRouter();
    const params = useParams();
    const code = params.code as string;

    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [results, setResults] = useState<ChallengeResult[]>([]);
    const [playerName, setPlayerName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchChallengeData();
        // Poll for updates every 5 seconds
        const interval = setInterval(fetchChallengeData, 5000);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    const fetchChallengeData = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
            const response = await fetch(`${apiUrl}/api/challenges/${code}`);
            
            if (!response.ok) {
                throw new Error('Challenge not found');
            }

            const data = await response.json();
            setChallenge(data.challenge);
            setResults(data.results || []);
            setError(null);
        } catch {
            setError('Challenge not found');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartGame = () => {
        if (!playerName.trim()) {
            alert("Please enter your name");
            return;
        }
        // Store player name in localStorage for the game
        localStorage.setItem('playerName', playerName);
        router.push(`/multiplayer/challenge/${code}/play`);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
                <p className="text-xl">Loading challenge...</p>
            </div>
        );
    }

    if (error || !challenge) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
                <Card className="p-8 bg-neutral-900 border-neutral-800 text-center space-y-4">
                    <h1 className="text-2xl font-bold text-red-400">Challenge Not Found</h1>
                    <p className="text-neutral-400">The challenge code &quot;{code}&quot; doesn&apos;t exist.</p>
                    <Button onClick={() => router.push("/multiplayer")} className="bg-purple-600 hover:bg-purple-700">
                        Back to Multiplayer
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-xy z-0 pointer-events-none" />
            
            <div className="z-10 w-full max-w-2xl space-y-6">
                {/* Header */}
                <Card className="p-6 bg-black/40 backdrop-blur-md border-white/10 shadow-xl shadow-purple-900/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                                Challenge Lobby
                            </h1>
                            <p className="text-neutral-400 mt-1">Code: <span className="text-purple-400 font-mono text-xl">{code}</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-neutral-400">Language</p>
                            <p className="text-xl font-bold">{challenge.language === 'en' ? '🇬🇧 English' : '🇮🇳 Hindi'}</p>
                        </div>
                    </div>
                </Card>

                {/* Player Input (if not played yet) */}
                {!results.find(r => r.player_name === playerName) && (
                    <Card className="p-6 bg-black/40 backdrop-blur-md border-white/10 space-y-4 shadow-xl shadow-blue-900/10">
                        <h2 className="text-xl font-bold">Join the Challenge</h2>
                        <Input
                            placeholder="Enter your name"
                            value={playerName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value)}
                            maxLength={50}
                            className="h-12 bg-neutral-800 border-neutral-700"
                        />
                        <Button
                            onClick={handleStartGame}
                            disabled={!playerName.trim()}
                            className="w-full h-14 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                        >
                            Start Playing
                        </Button>
                    </Card>
                )}

                {/* Leaderboard */}
                <Leaderboard 
                    scores={results} 
                    title={`Leaderboard (${results.length} ${results.length === 1 ? 'player' : 'players'})`}
                    currentPlayerName={playerName}
                />

                {/* Back Button */}
                <div className="text-center">
                    <Button
                        onClick={() => router.push("/multiplayer")}
                        variant="outline"
                        className="border-neutral-700"
                    >
                        Back to Multiplayer
                    </Button>
                </div>
            </div>
        </div>
    );
}

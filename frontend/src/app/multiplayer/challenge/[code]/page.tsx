"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Leaderboard from "@/components/Leaderboard";
import Loader from '@/components/Loader';

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
    const [isCreator, setIsCreator] = useState(false);

    // Check if creator is accessing via URL parameter
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const creatorName = urlParams.get('creator');
            if (creatorName) {
                setPlayerName(decodeURIComponent(creatorName));
                setIsCreator(true);
            }
        }
    }, []);

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
        return <Loader />;
    }

    if (error || !challenge) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-xy z-0 pointer-events-none" />
                
                <div className="z-10 w-full max-w-md">
                    <Card className="p-8 bg-black/40 backdrop-blur-md border-white/10 text-center space-y-6 shadow-2xl shadow-red-900/20">
                        {/* Error Icon */}
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/50 flex items-center justify-center">
                                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>

                        {/* Error Message */}
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                                Challenge Not Found
                            </h1>
                            <p className="text-neutral-400">
                                The challenge code <span className="text-red-400 font-mono font-bold">&quot;{code}&quot;</span> doesn&apos;t exist or has expired.
                            </p>
                        </div>

                        {/* Suggestions */}
                        <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 text-left space-y-2">
                            <p className="text-sm font-semibold text-neutral-300">Please check:</p>
                            <ul className="text-sm text-neutral-400 space-y-1 list-disc list-inside">
                                <li>The challenge code is correct</li>
                                <li>The challenge hasn&apos;t expired</li>
                                <li>You have the latest code from the creator</li>
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Button 
                                onClick={() => router.push("/multiplayer")} 
                                className="w-full h-12 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02]"
                            >
                                Back to Multiplayer
                            </Button>
                            <Button 
                                onClick={() => router.push("/")} 
                                variant="outline"
                                className="w-full border-neutral-700 hover:bg-neutral-800"
                            >
                                Go to Home
                            </Button>
                        </div>
                    </Card>
                </div>
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
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Join the Challenge</h2>
                            {isCreator && (
                                <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full">
                                    Creator
                                </span>
                            )}
                        </div>
                        <Input
                            placeholder="Enter your name"
                            value={playerName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value)}
                            maxLength={50}
                            disabled={isCreator}
                            className={`h-12 bg-neutral-800 border-neutral-700 ${isCreator ? 'opacity-75 cursor-not-allowed' : ''}`}
                        />
                        {isCreator && (
                            <p className="text-sm text-neutral-400">You created this challenge. Your name is already set.</p>
                        )}
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

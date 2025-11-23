"use client";

import { Card } from "@/components/ui/card";
import { Trophy, Clock } from "lucide-react";

interface Score {
    player_name: string;
    score: number;
    time_taken: number;
}

interface LeaderboardProps {
    scores: Score[];
    title?: string;
    currentPlayerName?: string;
}

export default function Leaderboard({ scores, title = "Leaderboard", currentPlayerName }: LeaderboardProps) {
    return (
        <Card className="p-6 bg-black/40 backdrop-blur-md border-white/10 space-y-4 shadow-xl shadow-yellow-900/10">
            <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold">{title}</h2>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
                {scores.length === 0 ? (
                    <p className="text-neutral-400 text-center py-4">No scores yet. Be the first!</p>
                ) : (
                    scores.map((score, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:scale-[1.01] ${
                                index === 0 
                                    ? 'bg-yellow-600/20 border border-yellow-600/50 shadow-lg shadow-yellow-900/20' 
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                            } ${score.player_name === currentPlayerName ? 'border-blue-500/50 bg-blue-500/10' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`font-bold w-6 text-center ${
                                    index === 0 ? 'text-yellow-400 text-xl' : 
                                    index === 1 ? 'text-neutral-300 text-lg' : 
                                    index === 2 ? 'text-amber-600 text-lg' : 'text-neutral-500'
                                }`}>
                                    #{index + 1}
                                </span>
                                <span className={score.player_name === currentPlayerName ? 'text-blue-400 font-bold' : ''}>
                                    {score.player_name}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1 text-neutral-400">
                                    <Clock className="w-4 h-4" />
                                    {score.time_taken}s
                                </div>
                                <div className="font-bold text-purple-400 w-16 text-right">
                                    {score.score} pts
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
}

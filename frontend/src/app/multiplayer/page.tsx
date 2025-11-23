"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Trophy, Zap } from "lucide-react";


export default function MultiplayerPage() {
    const router = useRouter();
    const [challengeCode, setChallengeCode] = useState("");
    const [isJoining, setIsJoining] = useState(false);

    const handleCreateChallenge = () => {
        router.push("/multiplayer/create");
    };

    const handleJoinChallenge = () => {
        if (!challengeCode.trim()) return;
        setIsJoining(true);
        router.push(`/multiplayer/challenge/${challengeCode.toUpperCase()}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black z-0 pointer-events-none" />
            
            <div className="z-10 w-full max-w-2xl space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Multiplayer Arena
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Challenge your friends to a music quiz battle!
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-6 bg-neutral-900/50 border-neutral-800 text-center">
                        <Users className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                        <h3 className="font-bold mb-2">Play with Friends</h3>
                        <p className="text-sm text-neutral-400">Share a code and compete</p>
                    </Card>
                    <Card className="p-6 bg-neutral-900/50 border-neutral-800 text-center">
                        <Zap className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                        <h3 className="font-bold mb-2">Speed Matters</h3>
                        <p className="text-sm text-neutral-400">Faster answers = more points</p>
                    </Card>
                    <Card className="p-6 bg-neutral-900/50 border-neutral-800 text-center">
                        <Trophy className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                        <h3 className="font-bold mb-2">Compete & Win</h3>
                        <p className="text-sm text-neutral-400">Top the leaderboard</p>
                    </Card>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Create Challenge */}
                    <Card className="p-8 bg-neutral-900 border-neutral-800 space-y-4">
                        <h2 className="text-2xl font-bold text-center">Create Challenge</h2>
                        <p className="text-neutral-400 text-center text-sm">
                            Start a new game and invite friends
                        </p>
                        <Button 
                            onClick={handleCreateChallenge}
                            className="w-full h-14 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02]"
                        >
                            Create New Challenge
                        </Button>
                    </Card>

                    {/* Join Challenge */}
                    <Card className="p-8 bg-neutral-900 border-neutral-800 space-y-4">
                        <h2 className="text-2xl font-bold text-center">Join Challenge</h2>
                        <p className="text-neutral-400 text-center text-sm">
                            Enter a 6-digit code to join
                        </p>
                        <Input
                            placeholder="Enter code (e.g., ABC123)"
                            value={challengeCode}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChallengeCode(e.target.value.toUpperCase())}
                            maxLength={6}
                            className="h-14 text-center text-2xl tracking-widest bg-neutral-800 border-neutral-700"
                        />
                        <Button 
                            onClick={handleJoinChallenge}
                            disabled={challengeCode.length !== 6 || isJoining}
                            className="w-full h-14 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02]"
                        >
                            {isJoining ? "Joining..." : "Join Challenge"}
                        </Button>
                    </Card>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Button 
                        onClick={() => router.push("/")}
                        variant="outline"
                        className="border-neutral-700"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}

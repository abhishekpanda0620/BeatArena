"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function CreateChallengePage() {
    const router = useRouter();
    const [playerName, setPlayerName] = useState("");
    const [language, setLanguage] = useState<"en" | "hi" | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [challengeCode, setChallengeCode] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleCreateChallenge = async () => {
        if (!playerName.trim() || !language) {
            toast.error("Please enter your name and select a language.");
            return;
        }

        setIsCreating(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
            const response = await fetch(`${apiUrl}/api/challenges/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    creator_name: playerName,
                    language: language,
                }),
            });

            if (!response.ok) throw new Error('Failed to create challenge');

            const data = await response.json();
            setChallengeCode(data.challenge.challenge_code);
            toast.success("Challenge created successfully!");
        } catch (error) {
            console.error("Failed to create challenge:", error);
            toast.error("Failed to create challenge. Please try again.");
        } finally {
            setIsCreating(false);
        }
    };

    const handleCopyCode = () => {
        if (challengeCode) {
            navigator.clipboard.writeText(challengeCode);
            setCopied(true);
            toast.success("Challenge code copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleStartGame = () => {
        if (challengeCode) {
            router.push(`/multiplayer/challenge/${challengeCode}?creator=${encodeURIComponent(playerName)}`);
        }
    };

    if (challengeCode) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-xy z-0 pointer-events-none" />
                
                <div className="z-10 w-full max-w-md space-y-8">
                    <Card className="p-8 bg-black/40 backdrop-blur-md border-white/10 text-center space-y-6 shadow-2xl shadow-purple-900/20">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                            Challenge Created!
                        </h1>
                        
                        <div className="space-y-2">
                            <p className="text-neutral-400">Share this code with your friends:</p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                                    <p className="text-4xl font-bold tracking-widest text-purple-400">
                                        {challengeCode}
                                    </p>
                                </div>
                                <Button
                                    onClick={handleCopyCode}
                                    variant="outline"
                                    className="h-14 w-14 border-neutral-700"
                                >
                                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={handleStartGame}
                                className="w-full h-14 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02]"
                            >
                                Enter Lobby
                            </Button>
                            <Button
                                onClick={() => router.push("/multiplayer")}
                                variant="outline"
                                className="w-full border-neutral-700"
                            >
                                Back to Multiplayer
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
            
            <div className="z-10 w-full max-w-md space-y-8">
                <Card className="p-8 bg-black/40 backdrop-blur-md border-white/10 space-y-6 shadow-2xl shadow-purple-900/20">
                    <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Create Challenge
                    </h1>

                    {/* Player Name */}
                    <div className="space-y-2">
                        <label className="text-sm text-neutral-400">Your Name</label>
                        <Input
                            placeholder="Enter your name"
                            value={playerName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value)}
                            maxLength={50}
                            className="h-12 bg-neutral-800 border-neutral-700"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-neutral-400">Select Music Language</label>
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                onClick={() => setLanguage("en")}
                                variant={language === "en" ? "default" : "outline"}
                                className={language === "en" 
                                    ? "h-16 font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-900/20 transition-all duration-300 scale-[1.02] border-0" 
                                    : "h-16 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600 transition-all duration-300"
                                }
                            >
                                English 🇬🇧
                            </Button>
                            <Button
                                onClick={() => setLanguage("hi")}
                                variant={language === "hi" ? "default" : "outline"}
                                className={language === "hi" 
                                    ? "h-16 font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-900/20 transition-all duration-300 scale-[1.02] border-0" 
                                    : "h-16 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600 transition-all duration-300"
                                }
                            >
                                Hindi 🇮🇳
                            </Button>
                        </div>
                    </div>

                    <Button
                        onClick={handleCreateChallenge}
                        disabled={!playerName.trim() || !language || isCreating}
                        className="w-full h-14 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {isCreating ? "Creating..." : "Create Challenge"}
                    </Button>

                    <Button
                        onClick={() => router.push("/multiplayer")}
                        variant="outline"
                        className="w-full border-neutral-700"
                    >
                        Cancel
                    </Button>
                </Card>
            </div>
        </div>
    );
}
